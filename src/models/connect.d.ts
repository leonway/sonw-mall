import { UserModelState } from './user';

export interface ConnectProps {
  location: Location & { state: { from: string } };
}

export interface ConnectState {
  user: UserModelState;
}

export { UserModelState };
