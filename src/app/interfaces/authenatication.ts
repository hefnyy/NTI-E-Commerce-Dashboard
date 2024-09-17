export interface SignUp {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}
export interface Login {
  readonly email: string;
  readonly password: string;
}