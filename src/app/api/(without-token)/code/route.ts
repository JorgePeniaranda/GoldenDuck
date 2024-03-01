import { messages } from '@/const/messages'
import ConfirmationCode from '@/services/codeService'
import {
  AuthorizationError,
  GenerateErrorResponse,
  RequestError
} from '@/services/errorService'
import JWT from '@/services/jwtService'
import { StatusCodes } from 'http-status-codes'
import { type NextRequest, NextResponse } from 'next/server'

const CodeService = new ConfirmationCode()
const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const { code: userCode } = await request.json()
    const userToken = String(
      request.headers.get('token') ?? request.cookies.get('token')?.value
    )

    // validate request
    if (userCode === undefined) {
      throw new RequestError(messages.noCode)
    }

    // verify token and code
    const { email, code } = jwt.verifyTempToken(userToken)
    if (!CodeService.checkCode(String(userCode), String(code))) {
      throw new AuthorizationError(messages.codeInvalid)
    }

    // generate token with email
    const token = jwt.generateToken({ email })

    // generate and send response
    const response = NextResponse.json(
      { token, message: messages.validated },
      { status: StatusCodes.OK }
    )

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
