import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  deleteProfile,
  getAllUsersProfiles,
} from "../../redux/apicalls/profileApiCall";
import {
  SkeletonRow,
  TableSearch,
  TableStatChip,
  TableFooter,
  EmptyRow,
} from "./Tableutils";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector(
    (state) => state.profile,
  ); /* --- IGNORE --- */
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const deleteUserHandler = (userID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userID));
        swal("User has been deleted!", { icon: "success" });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllUsersProfiles()).finally(() => setLoading(false));
  }, [isProfileDeleted]);

  const filtered =
    profiles?.filter(
      (p) =>
        p.username.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        {/* ── Chips ── */}
        <div className="tbl-chips-row">
          <TableStatChip
            icon="bi-people-fill"
            label="Total"
            value={profiles?.length}
            color="blue"
          />
          <TableStatChip
            icon="bi-person-check"
            label="Verified"
            value={profiles?.filter((p) => p.isAccountVerified).length}
            color="green"
          />
          <TableStatChip
            icon="bi-search"
            label="Filtered"
            value={search ? filtered.length : null}
            color="warn"
          />
        </div>

        {/* ── Header ── */}
        <div className="table-header-row">
          <h1 className="table-title">
            <i className="bi bi-people-fill" /> Users
          </h1>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email…"
          />
        </div>

        {/* ── Table ── */}
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={4} />
                ))
              ) : filtered.length === 0 ? (
                <EmptyRow cols={4} message="No users found." />
              ) : (
                filtered.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className="table-row-reveal"
                  >
                    <td className="table-count">{index + 1}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src={item.profilePhoto.url}
                          alt={item.username}
                          className="table-user-image"
                        />
                        <span className="table-username">{item.username}</span>
                      </div>
                    </td>
                    <td>
                      <span className="user-email">{item.email}</span>
                    </td>
                    <td>
                      <div className="table-button-group">
                        <button className="btn-view">
                          <Link to={`/profile/${item._id}`}>
                            <i className="bi bi-eye" /> View
                          </Link>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteUserHandler(item._id)}
                        >
                          <i className="bi bi-trash3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <TableFooter
            shown={filtered.length}
            total={profiles?.length}
            noun="users"
          />
        )}
      </div>
    </div>
  );
};

export default UsersTable;
