import utilsTypes from '!!raw-loader!@kqfe/utils/dist/index.d.ts';

const removeExportData = utilsTypes.replace(/export {[^}]*};/g, '');

export default removeExportData;
