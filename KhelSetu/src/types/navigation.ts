export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type TabParamList = {
  Home: undefined;
  Tests: undefined;
  Dashboard: undefined;
  About: undefined;
  Resources: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: any;
  route: { params: RootStackParamList[T] };
};

export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: any;
  route: { params: TabParamList[T] };
};
