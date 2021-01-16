import HometaskSwitch from './HometaskSwitch';
import TogglePopover from './toggle-popovers/TogglePopover';
import LocalData from './LocalData';
import BuyListTable from './list-editor/BuyListTable';
import { data as defaultData } from './list-editor/data';

const hometaskSwitch = new HometaskSwitch();
hometaskSwitch.switchTaskManually('popovers');

const togglePopover = new TogglePopover();
togglePopover.addEventListeners();

const localBuyList = LocalData.load('buylist');
const data = localBuyList || defaultData;
const buyListTable = new BuyListTable(data);
