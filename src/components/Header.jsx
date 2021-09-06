import React, { Component } from "react";
import { alpha, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ShoppingCart from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { LogoutAction } from "./../redux/actions";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  back: {
    backgroundColor: "#003e4d",
  },
  title: {
    // display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(5),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class Header extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
    openMobile: false,
    mobileMoreAnchorEl: null,
  };

  // isMenuOpen = Boolean(this.state.anchorEl);
  // isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

  handleProfileMenuOpen = (event) => {
    console.log(event.currentTarget);

    this.setState({ anchorEl: event.currentTarget, openMenu: true });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null, openMobile: false });
    // setMobileMoreAnchorEl(null);
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null, openMenu: false });

    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    console.log(event);

    this.setState({
      mobileMoreAnchorEl: event.currentTarget,
      openMobile: true,
    });
  };

  onLogout = () => {
    localStorage.removeItem("id");
    this.props.LogoutAction();
  };

  menuId = "primary-search-account-menu";

  renderMenu = () => (
    <Menu
      anchorEl={this.state.anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={this.menuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={this.state.openMenu}
      onClose={this.handleMenuClose}
    >
      {this.props.auth.role === "admin" ? (
        <Link to="/admin">
          <MenuItem>admin Menu</MenuItem>
        </Link>
      ) : (
        [
          <MenuItem key="1" onClick={this.handleMenuClose}>
            Profile
          </MenuItem>,
          <MenuItem key="2" onClick={this.handleMenuClose}>
            My account
          </MenuItem>,
        ]
      )}
      <Link className="txt-link" to="/">
        <MenuItem onClick={this.onLogout}>LogOut</MenuItem>
      </Link>
    </Menu>
  );

  mobileMenuId = "primary-search-account-menu-mobile";
  renderMobileMenu = () => (
    <Menu
      anchorEl={this.state.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={this.mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={this.state.openMobile}
      onClose={this.handleMobileMenuClose}
    >
      {this.props.auth.isLogin ? (
        <>
          {this.props.auth.role === "admin"
            ? null
            : [
                <MenuItem>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge
                      badgeContent={this.props.auth.carts.length}
                      color="secondary"
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <p>Carts</p>
                </MenuItem>,
                <MenuItem>
                  <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={11} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem>,
              ]}

          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>{this.props.auth.username}</p>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <Link to="/login" className="txt-link">
            Login
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  render() {
    const { classes, auth } = this.props;

    return (
      <>
        <div className={classes.grow}>
          <AppBar className={classes.back} position="static">
            <Toolbar>
              {/* <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                   <MenuIcon /> 
                </IconButton> */}
              <Typography className={classes.title} variant="h6" noWrap>
                AKEA
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              {auth.isLogin ? (
                <>
                  <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                      <Badge
                        badgeContent={this.props.auth.carts.length}
                        color="secondary"
                      >
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <div>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={this.menuId}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                        <Typography>{auth.username}</Typography>
                      </IconButton>
                    </div>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={this.mobileMenuId}
                      aria-haspopup="true"
                      onClick={this.handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.sectionDesktop}>
                    <Link to="/login" className="txt-link">
                      <Button className="bg-light">Login</Button>
                    </Link>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={this.mobileMenuId}
                      aria-haspopup="true"
                      onClick={this.handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </Toolbar>
          </AppBar>
          {this.renderMobileMenu()}
          {this.renderMenu()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { LogoutAction })(
  withStyles(styles)(Header)
);
