import { getClient } from "@/lib/graphql/client";
import { gql } from "@apollo/client";
import { ITransaction } from "../types/entity";

export async function QUERYAllTransaction() {
  const { data } = await getClient().query<{
    find_all_transaction: ITransaction[]
  }>({
    query: gql`
      query{
        find_all_transaction(AccountIndex: 1){
          id
          idSender
          idReceiver
          idCategory
          createdAt
          canceled
        }
      }
    `,
  })

  return data.find_all_transaction
}