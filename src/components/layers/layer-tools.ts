import { LayerType } from '@/definitions';
import type { RampLayerConfig } from '@/definitions';

/**
 * Something that a layer type can be derived from
 */
type LayerTypeThang = LayerType | RampLayerConfig;

/**
 * Helper that answers if a layer type thang has a type that matches the provided list
 */
const layerTypeChecker = (thang: LayerTypeThang, ...layerTypes: Array<LayerType>): boolean => {
    const layerT = typeof thang === 'string' ? thang : thang.layerType;
    return layerTypes.some(checkType => layerT === checkType);
};

/**
 * Is a layer that is just data (no spatial)
 */
export const isDataLayer = (layerThang: LayerTypeThang): boolean =>
    layerTypeChecker(layerThang, LayerType.DATACSV, LayerType.DATAJSON, LayerType.DATATABLE);

/**
 * Is a file-based map layer
 */
export const isFileLayer = (layerThang: LayerTypeThang): boolean =>
    layerTypeChecker(
        layerThang,
        LayerType.CSV,
        LayerType.FLATGEOBUF,
        LayerType.FLATGEOBUFZIPPED,
        LayerType.GEOJSON,
        LayerType.GEOJSONZIPPED,
        LayerType.SHAPEFILE,
        LayerType.WFS
    );

/**
 * Is a layer with Vector geometry
 */
export const isVectorLayer = (layerThang: LayerTypeThang): boolean =>
    layerTypeChecker(layerThang, LayerType.FEATURE) || isFileLayer(layerThang);

/**
 * Is a layer that supports pointer tolerances
 */
export const isToleranceLayer = (layerThang: LayerTypeThang): boolean =>
    layerTypeChecker(layerThang, LayerType.MAPIMAGE, LayerType.FEATURE);

/**
 * Is a map layer that contains sublayers
 */
export const isParentLayer = (layerThang: LayerTypeThang): boolean =>
    layerTypeChecker(layerThang, LayerType.MAPIMAGE, LayerType.WMS);

/**
 * Is a map image layer
 */
export const isMIL = (layerThang: LayerTypeThang): boolean => layerTypeChecker(layerThang, LayerType.MAPIMAGE);

/**
 * Is a geojson layer
 */
export const isGeoJson = (layerThang: LayerTypeThang): boolean => layerTypeChecker(layerThang, LayerType.GEOJSON);

/**
 * Is a csv layer
 */
export const isCSV = (layerThang: LayerTypeThang): boolean => layerTypeChecker(layerThang, LayerType.CSV);

/**
 * Is a wfs layer
 */
export const isWFS = (layerThang: LayerTypeThang): boolean => layerTypeChecker(layerThang, LayerType.WFS);

/**
 * Is a wms layer
 */
export const isWMS = (layerThang: LayerTypeThang): boolean => layerTypeChecker(layerThang, LayerType.WMS);

/**
 * Is a layer that supports standard attributes
 */
export const isAttributeLayer = (layerThang: LayerTypeThang): boolean =>
    isVectorLayer(layerThang) || isDataLayer(layerThang);
