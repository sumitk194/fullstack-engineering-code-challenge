
import { Routes } from 'nest-router';
import { ResultModule } from '@modules/result/result.module';
import { API_VERSIONS } from '@constants/constants';

export const routes: Routes = [
  {
    path: `/${API_VERSIONS.V1}`,
    children: [ResultModule],
  },
];
