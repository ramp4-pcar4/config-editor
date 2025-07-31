import { createInstance } from './index';
import { createInstance as createRampInstance, geo, configUpgrade, layerConfigUpgrade, version } from 'ramp-pcar';

// This is the starting point for the local index.html to play with the editor.

// Put the editor's API on the window.
// Since this is a standalone app and pages will be integrating this using <iframe>, this will not result in multiple instances not having their
// own API.
// @ts-ignore
window.ramp4EditorAPI = createInstance(document.getElementById('app'));
// @ts-ignore
window.RAMP = {
    createInstance: createRampInstance,
    geo,
    configUpgrade,
    layerConfigUpgrade,
    version
};
