import React from "react";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt='70px' p='40px 0' backgroundColor={neutral.light}>
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px, 30px, 40px)'>
        <Box width='clamp(20%, 30%, 40%)'>
          <Typography
            variant='h4'
            fontWeight='bold'
            mb='30px'
            color={shades.secondary[500]}>
            ECOMMER
          </Typography>
          <div>
            Aute commodo mollit in ex do. Duis ullamco qui et ipsum sint
            adipisicing nisi proident culpa enim commodo. Esse et occaecat
            officia nisi sunt mollit anim amet amet veniam mollit ut do. Laborum
            fugiat ad velit Lorem esse fugiat. Labore aliquip esse fugiat
            reprehenderit cillum cillum eu amet excepteur ipsum.
          </div>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            A propos de nous
          </Typography>
          <Typography mb='30px'>Carrières</Typography>
          <Typography mb='30px'>Nox Boutiques</Typography>
          <Typography mb='30px'>Termes & Conditions</Typography>
          <Typography mb='30px'>Politique De Confidentialité</Typography>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Service Client
          </Typography>
          <Typography mb='30px'>Centre d'Aide</Typography>
          <Typography mb='30px'>Suivre Votre Commande</Typography>
          <Typography mb='30px'>Achats d'Entreprise</Typography>
          <Typography mb='30px'>Retours et Remboursements</Typography>
        </Box>

        <Box width='clamp(20%, 25%, 30%)'>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Nous Contacter
          </Typography>
          <Typography mb='30px'>3 Place des 2 Ecus, Paris, 75001</Typography>
          <Typography mb='30px'>E-mail: something@mail.com</Typography>
          <Typography mb='30px'>0123456789</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
