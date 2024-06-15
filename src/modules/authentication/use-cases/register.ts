import { RegisterDTO } from '../types/dto'

export async function onSubmitData (_form: RegisterDTO, _callback?: () => void): Promise<void> {
}

export const onSubmitCode = async (_form: RegisterDTO, _code: string): Promise<void> => {
}
