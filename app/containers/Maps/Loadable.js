/**
 *
 * Asynchronously loads the component for MapTest
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
