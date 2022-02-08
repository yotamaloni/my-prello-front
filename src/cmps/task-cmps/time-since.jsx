import { utilService } from '../../services/util.service.js'

export function TimeSince({ activity }) {
    const { createdAt } = activity;
    const date = new Date(createdAt);
    const time = utilService.getTimeSince(date);
    return (
        <span>
            {time}
        </span>
    );
}
