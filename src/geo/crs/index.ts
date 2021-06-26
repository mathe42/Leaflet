export { CRS } from './CRS';
import { Earth as earth } from "./CRS.Earth";
import { EPSG3395 as epsg3395 } from "./CRS.EPSG3395";
import { EPSG3857 as epsg3857, EPSG900913 as epsg900913 } from "./CRS.EPSG3857";
import { EPSG4326 as epsg4326 } from "./CRS.EPSG4326";
import { Simple as simple } from "./CRS.Simple";

export const Earth = new earth()
export const EPSG3395 = new epsg3395()
export const EPSG3857 = new epsg3857();
export const EPSG900913 = new epsg900913();
export const EPSG4326 = new epsg4326();
export const Simple = new simple()
