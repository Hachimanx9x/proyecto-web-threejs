import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);

  let active = child.props.active || null;
  if (router.pathname === props.href) {
    active = true;
  }

  delete props.active;

  return <Link {...props}>{React.cloneElement(child, { active })}</Link>;
};

export default withRouter(ActiveLink);
