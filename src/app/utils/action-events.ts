import { CountdownData } from 'src/app/utils/countdown';

export interface ActionEvent {
    type: string;
    id: number;
    events: CountdownData;
};