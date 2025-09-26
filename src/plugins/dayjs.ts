import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.extend(utc);

dayjs.locale('es');

export default dayjs;
