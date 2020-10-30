import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthParamList = {
  SignUpView: undefined;
  SignInView: undefined;
  AccountView: undefined;
  DashboardView: undefined;
  AccountLinkingView: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
