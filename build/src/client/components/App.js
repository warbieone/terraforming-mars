"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainAppSettings = void 0;
const GameEnd_vue_1 = require("@/client/components/GameEnd.vue");
const CreateGameForm_vue_1 = require("@/client/components/create/CreateGameForm.vue");
const GameHome_vue_1 = require("@/client/components/GameHome.vue");
const GamesOverview_vue_1 = require("@/client/components/GamesOverview.vue");
const PlayerHome_vue_1 = require("@/client/components/PlayerHome.vue");
const PlayerInputFactory_vue_1 = require("@/client/components/PlayerInputFactory.vue");
const SpectatorHome_vue_1 = require("@/client/components/SpectatorHome.vue");
const StartScreen_vue_1 = require("@/client/components/StartScreen.vue");
const LoadGameForm_vue_1 = require("@/client/components/LoadGameForm.vue");
const DebugUI_vue_1 = require("@/client/components/DebugUI.vue");
const Help_vue_1 = require("@/client/components/help/Help.vue");
const AdminHome_vue_1 = require("@/client/components/admin/AdminHome.vue");
const i18n_1 = require("@/client/directives/i18n");
const constants = require("@/common/constants");
const paths = require("@/common/app/paths");
const HTTPResponseCode = require("@/client/utils/HTTPResponseCode");
const raw_settings = require("@/genfiles/settings.json");
const Types_1 = require("@/common/Types");
const HTMLDialogElementCompatibility_1 = require("./HTMLDialogElementCompatibility");
const dialogPolyfill = require('dialog-polyfill');
exports.mainAppSettings = {
    'el': '#app',
    'data': {
        screen: 'empty',
        playerkey: 0,
        settings: raw_settings,
        isServerSideRequestInProgress: false,
        componentsVisibility: {
            'milestones': true,
            'awards_list': true,
            'tags_concise': false,
            'pinned_player_0': false,
            'pinned_player_1': false,
            'pinned_player_2': false,
            'pinned_player_3': false,
            'pinned_player_4': false,
            'turmoil_parties': false,
        },
        game: undefined,
        playerView: undefined,
        spectator: undefined,
        logPaused: false,
    },
    'components': {
        'player-input-factory': PlayerInputFactory_vue_1.default,
        'start-screen': StartScreen_vue_1.default,
        'create-game-form': CreateGameForm_vue_1.default,
        'load-game-form': LoadGameForm_vue_1.default,
        'game-home': GameHome_vue_1.default,
        'player-home': PlayerHome_vue_1.default,
        'spectator-home': SpectatorHome_vue_1.default,
        'game-end': GameEnd_vue_1.default,
        'games-overview': GamesOverview_vue_1.default,
        'debug-ui': DebugUI_vue_1.default,
        'help': Help_vue_1.default,
        'admin-home': AdminHome_vue_1.default,
    },
    'methods': {
        showAlert(message, cb = () => { }) {
            const dialogElement = document.getElementById('alert-dialog');
            const buttonElement = document.getElementById('alert-dialog-button');
            const messageElement = document.getElementById('alert-dialog-message');
            if (buttonElement !== null && messageElement !== null && dialogElement !== null && (0, HTMLDialogElementCompatibility_1.hasShowModal)(dialogElement)) {
                messageElement.innerHTML = (0, i18n_1.$t)(message);
                const handler = () => {
                    buttonElement.removeEventListener('click', handler);
                    cb();
                };
                buttonElement.addEventListener('click', handler);
                (0, HTMLDialogElementCompatibility_1.showModal)(dialogElement);
            }
            else {
                alert(message);
                cb();
            }
        },
        setVisibilityState(targetVar, isVisible) {
            if (isVisible === this.getVisibilityState(targetVar))
                return;
            this.componentsVisibility[targetVar] = isVisible;
        },
        getVisibilityState(targetVar) {
            return this.componentsVisibility[targetVar] ? true : false;
        },
        update(path) {
            const currentPathname = getLastPathSegment();
            const xhr = new XMLHttpRequest();
            const app = this;
            const url = 'api/' + path + window.location.search.replace('&noredirect', '');
            xhr.open('GET', url);
            xhr.onerror = function () {
                alert('Error getting game data');
            };
            xhr.onload = function () {
                try {
                    if (xhr.status === HTTPResponseCode.OK) {
                        const model = xhr.response;
                        if (path === paths.PLAYER) {
                            app.playerView = model;
                            (0, i18n_1.setTranslationContext)(app.playerView);
                        }
                        else if (path === paths.SPECTATOR) {
                            app.spectator = model;
                        }
                        app.playerkey++;
                        if (model.game.phase === 'end' &&
                            window.location.search.includes('&noredirect') === false) {
                            app.screen = 'the-end';
                            if (currentPathname !== paths.THE_END) {
                                window.history.replaceState(xhr.response, `${constants.APP_NAME} - Player`, `${paths.THE_END}?id=${model.id}`);
                            }
                        }
                        else {
                            if (path === paths.PLAYER) {
                                app.screen = 'player-home';
                            }
                            else if (path === paths.SPECTATOR) {
                                app.screen = 'spectator-home';
                            }
                            if (currentPathname !== path) {
                                window.history.replaceState(xhr.response, `${constants.APP_NAME} - Game`, `${path}?id=${model.id}`);
                            }
                        }
                    }
                    else {
                        alert('Unexpected server response: ' + xhr.statusText);
                    }
                }
                catch (e) {
                    console.log('Error processing XHR response: ' + e);
                }
            };
            xhr.responseType = 'json';
            xhr.send();
        },
        updatePlayer() {
            this.update(paths.PLAYER);
        },
        updateSpectator: function () {
            this.update(paths.SPECTATOR);
        },
    },
    mounted() {
        document.title = constants.APP_NAME;
        if (!(0, HTMLDialogElementCompatibility_1.windowHasHTMLDialogElement)())
            dialogPolyfill.default.registerDialog(document.getElementById('alert-dialog'));
        const currentPathname = getLastPathSegment();
        const app = this;
        if (currentPathname === paths.PLAYER) {
            app.updatePlayer();
        }
        else if (currentPathname === paths.THE_END) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id') || '';
            if ((0, Types_1.isPlayerId)(id)) {
                app.updatePlayer();
            }
            else if ((0, Types_1.isSpectatorId)(id)) {
                app.updateSpectator();
            }
            else {
                alert('Bad id URL parameter.');
            }
        }
        else if (currentPathname === paths.GAME) {
            app.screen = 'game-home';
            const xhr = new XMLHttpRequest();
            xhr.open('GET', paths.API_GAME + window.location.search);
            xhr.onerror = function () {
                alert('Error getting game data');
            };
            xhr.onload = function () {
                if (xhr.status === HTTPResponseCode.OK) {
                    window.history.replaceState(xhr.response, `${constants.APP_NAME} - Game`, `${paths.GAME}?id=${xhr.response.id}`);
                    app.game = xhr.response;
                }
                else {
                    alert('Unexpected server response');
                }
            };
            xhr.responseType = 'json';
            xhr.send();
        }
        else if (currentPathname === paths.GAMES_OVERVIEW) {
            app.screen = 'games-overview';
        }
        else if (currentPathname === paths.NEW_GAME) {
            app.screen = 'create-game-form';
        }
        else if (currentPathname === paths.LOAD) {
            app.screen = 'load';
        }
        else if (currentPathname === paths.CARDS) {
            app.screen = 'cards';
        }
        else if (currentPathname === paths.HELP) {
            app.screen = 'help';
        }
        else if (currentPathname === paths.SPECTATOR) {
            app.updateSpectator();
        }
        else if (currentPathname === paths.ADMIN) {
            app.screen = 'admin';
        }
        else {
            app.screen = 'start-screen';
        }
    },
};
function getLastPathSegment() {
    return window.location.pathname.replace(/.*\//g, '');
}
