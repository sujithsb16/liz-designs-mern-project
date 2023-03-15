import React from 'react'

const UserHeaders = () => {
  return (
    <div>

<AppBar
      position="fixed"
      style={{ backgroundColor: "#ced4da" }}
      sx={{ opacity: "0.8" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="LoGo"
            src={Logo}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              opacity: "0.8",
              width: "5rem",
              height: "5rem",
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", opacity: "0.8" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link key={index} to={`${links[index]}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            alt="LoGo"
            src={Logo}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              width: "5rem",
              height: "5rem",
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Link key={index} to={`${links[index]}`}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "flex",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          {isUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box color={blue}>
              <Link to="/login">
                <Button>LogIn </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
      
    </div>
  )
}

export default UserHeaders
