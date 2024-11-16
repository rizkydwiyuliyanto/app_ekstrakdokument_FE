/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import male from "assets/images/male.png";
import female from "assets/images/female.png";
import { useEffect, useState } from "react";
import TextRow from "components/TextRow";
import { getData } from "request/request";
import { useLocation, NavLink } from "react-router-dom";

export default function data({ header, link }) {
  const [fetch, setFetch] = useState({
    columns: header,
    rows: [],
  });
  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
  };
  const [loading, setLoading] = useState(true);
  const avatarItems = [team2, team3, team4];
  const fetchRows = (obj) => {
    let str = [];
    if (obj) {
      Object.keys(obj).forEach((prop) => {
        if (obj[prop] !== "") {
          str.push(`${prop}=${obj[prop]}`);
        }
      });
      str = str.join("&");
    }
    getData({ link: `${link}${obj ? `?${str}` : ""}` })
      .then((res) => {
        console.log(res);
        setFetch({
          ...fetch,
          rows: res.data.map((x, idx) => {
            return {
              id_mata_kuliah: <TextRow FirstText={x.id_mata_kuliah} />,
              mata_kuliah: (
                <TextRow
                  // AvatarImage={team2}
                  FirstText={x.mata_kuliah}
                />
              ),
              semester: (
                <TextRow
                  // AvatarImage={team2}
                  FirstText={x.semester}
                />
              ),
              sks: (
                <TextRow
                  // AvatarImage={team2}
                  FirstText={x.sks}
                />
              ),
              action: (
                // /master/edit_dosen
                <NavLink>
                  <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
                    Detail
                  </MDTypography>
                </NavLink>
              ),
            };
          }),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRows();
  }, []);

  return {
    data: fetch,
    loading: loading,
    reload: (obj) => {
      // setLoading(true);
      fetchRows(obj);
    },
  };
}
