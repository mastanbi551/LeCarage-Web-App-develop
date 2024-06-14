import { MethodType, Urls } from '../../../utils/constants';
import { onLoadingStart, onLoadingStop } from '../../../pages/commonStates/CommonSlice';
import { SidebarResponse } from './SidebarStateInterface';
import { menusOnFailure, menusOnSuccess } from './SidebarSlice';
import { put } from 'redux-saga/effects';
import { onFailure } from '../../header/headerstate/HeaderSlice';
import { getApiCall } from '../../../utils';
import { responseStatus } from '../../../utils/constants/ConstantStrings';



function* getDashboardMenus(params: { payload: string; type: string }): unknown {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(params, Urls.adminMenus, MethodType.GET);//DashboardMenusApi.getDashboardMenusBasedOnUserTypeApiCall(params.payload);
      const jsonRes: SidebarResponse['responseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(menusOnSuccess(jsonRes));
      } else {
        yield put(menusOnFailure(jsonRes));
      }
      yield put(onLoadingStop());
  
    } catch (error) {
      yield put(onLoadingStop());
  
    }
  }

export const getDashboardMenusWorker = getDashboardMenus;