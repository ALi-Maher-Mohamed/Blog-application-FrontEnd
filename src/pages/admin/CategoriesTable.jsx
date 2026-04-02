import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apicalls/categoryApiCall";
import {
  TableSearch,
  TableStatChip,
  TableFooter,
  EmptyRow,
} from "./Tableutils";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCategories()).finally(() => setLoading(false));
  }, []);

  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  const filtered =
    categories?.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div className="tbl-chips-row">
          <TableStatChip
            icon="bi-tags-fill"
            label="Total"
            value={categories?.length}
            color="blue"
          />
        </div>

        <div className="table-header-row">
          <h1 className="table-title">
            <i className="bi bi-tags-fill" /> Categories
          </h1>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search categories…"
          />
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td>
                      <div className="skeleton skeleton-cell skeleton-sm" />
                    </td>
                    <td>
                      <div className="skeleton skeleton-cell skeleton-lg" />
                    </td>
                    <td>
                      <div className="skeleton skeleton-btn" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <EmptyRow cols={3} message="No categories found." />
              ) : (
                filtered.map((item, index) => (
                  <tr
                    key={item._id}
                    className="table-row-reveal"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="table-count">{index + 1}</td>
                    <td>
                      <span className="category-badge">
                        <i className="bi bi-tag-fill" />
                        {item.title}
                      </span>
                    </td>
                    <td>
                      <div className="table-button-group">
                        <button
                          className="btn-delete"
                          onClick={() => deleteCategoryHandler(item._id)}
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
            total={categories?.length}
            noun="categories"
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesTable;
