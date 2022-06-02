export interface ValidationInterface {
  required: boolean;
  message: string;
  trigger: 'submit' | 'change'
}