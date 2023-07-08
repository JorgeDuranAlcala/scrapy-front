import Link from "next/link";
import { useRouter } from 'next/router'

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { type GridRenderCellParams } from "@mui/x-data-grid";

import { Counter, ActionButton } from "src/components/Shared";

type Props = {
  openEmailModal: (id: string) => void
  openCommentsModal: (id: string, comments: string) => void
} & GridRenderCellParams

const ListingOptionColumn = (props: Props) => {
  const {id, row: { comments, link, count, email }} = props
  const { asPath } = useRouter()

  return (
    <Stack
      justifyContent="start"
      direction="row"
      alignItems="center"
      gap={0.25}
    >
      <a href={link}>
        <ActionButton
          title={"Ver"}
          icon="tabler:eye"
          buttonProps={{ sx: { padding: "4px" } }}
        />
      </a>
      <ActionButton
        title={"Enviar email"}
        icon="tabler:mail"
        buttonProps={{
          onClick: () => {
            props.openEmailModal(email);
          },
          sx: { padding: "4px" },
        }}
      />
      <Box padding={"4px"}>
        <Counter value={count} />
      </Box>
      <ActionButton
        title={"Adjuntar"}
        icon="tabler:paperclip"
        buttonProps={{
          component: Link,
          href: `${asPath}documents/${id}`,
          passHref: true,
          sx: { padding: "4px" },
        }}
      />
      <ActionButton title='Comentarios'
          icon={`tabler:${comments && comments.length > 0 ? 'info-circle-filled' : 'info-circle'}`}
          buttonProps={{
              onClick: () => {props.openCommentsModal(id as string, comments) },
              sx: { padding: "4px" }
          }}
        />
    </Stack>
  );
};

export default ListingOptionColumn
