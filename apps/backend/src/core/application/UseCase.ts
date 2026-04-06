export interface UseCase<InputType = unknown> {
  execute: (input: InputType) => Promise<unknown>;
}
