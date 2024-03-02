import { type NextRequest, NextResponse } from 'next/server'
import ConfirmationCode from '@/services/codeService'
import {
  AuthorizationError,
  GenerateErrorResponse,
  RequestError
} from '@/services/errorService'
import JWT from '@/services/jwtService'
import { getRequestData } from '@/utils'
import { StatusCodes } from 'http-status-codes'
import { ErrorsDictionary } from '@/const/messages'

const CodeService = new ConfirmationCode()
const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const { code: userCode } = await getRequestData(request)

    const userToken = String(
      request.headers.get('token') ?? request.cookies.get('token')?.value
    )

    // validate request
    if (userCode === undefined) {
      throw new RequestError(ErrorsDictionary.NoCodeSent)
    }

    // verify token and code
    const { email, code } = jwt.verifyTempToken(userToken)
    if (!CodeService.checkCode(String(userCode), String(code))) {
      throw new AuthorizationError(ErrorsDictionary.IncorrectCode)
    }

    // generate token with email
    const token = jwt.generateToken({ email })

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
