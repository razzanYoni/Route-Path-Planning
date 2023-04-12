import {Dispatch, SetStateAction} from "react";
import { Flex, Text } from "@chakra-ui/react";

export function ResultOutput({result, setResult} : {
    result: string,
    setResult : Dispatch<SetStateAction<string>>

})
{
    return(
        <Flex>
            <Text
                alignContent={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                width={{ base: "100%", md: "50vw" }}
                height={"100%"}
                overflowY={"scroll"}
                overflowX={"hidden"}
                fontSize={"lg"}
                fontWeight={"bold"}
                color={"teal.200"}
            >
                {result}
            </Text>
        </Flex>
    )
}