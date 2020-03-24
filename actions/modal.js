import { OPEN_MODAL, CLOSE_MODAL } from './types';

export const open_modal = (render) => ({
  type: OPEN_MODAL,
  render
})

export const close_modal = () => ({ type: CLOSE_MODAL })