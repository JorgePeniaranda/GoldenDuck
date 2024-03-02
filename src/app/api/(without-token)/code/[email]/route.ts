import ConfirmationCode from '@/services/codeService'
import { GenerateErrorResponse, ValidationError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import validations from '@/services/validationService'
import { StatusCodes } from 'http-status-codes'
import { type NextRequest, NextResponse } from 'next/server'

const jwt = new JWT()

export async function GET (
  request: NextRequest,
  { params: { email } }: { params: { email: string } }
): Promise<NextResponse> {
  const CodeService = new ConfirmationCode()

  try {
    // validate email
    await validations.email.parseAsync(email).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })

    // send code to email
    CodeService.sendCode(email)

    // generate token with code and email
    const tokenData = {
      code: CodeService.getCode(),
      email
    }

    const token = jwt.generateTempToken(tokenData)

    // generate and send response
    const response = NextResponse.json({ token }, { status: StatusCodes.OK })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 5,
      path: '/'
    })

    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
