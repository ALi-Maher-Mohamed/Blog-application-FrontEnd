import "./profile.css";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apicalls/profileApiCall";
import PostItem from "../../components/Posts/PostItem";
import { logOutUser } from "../../redux/apicalls/authApiCall";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile,
  );
  const { user } = useSelector((state) => state.auth);

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    // using selector to get user profile
    window.scrollTo(0, 0);
  }, [id]);

  // Form Submit Handler
  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      // بننتظر الـ dispatch يخلص
      await dispatch(uploadProfilePhoto(formData));
      setFile(null); // بنصفر الملف عشان الزرار يختفي والـ Preview يرجع لصورة البروفايل الرسمية
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload photo");
    }
  };

  // Delete Account Handler
  const navigate = useNavigate();
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logOutUser());
      }
    });
  };
  useEffect(() => {
    if (isProfileDeleted) {
      toast.success("Your account has been deleted successfully!");
      navigate("/register");
    }
  }, [navigate, isProfileDeleted]);
  if (loading) {
    return (
      <div className="profile-loader">
        <Oval
          height={120}
          width={120}
          radius={9}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="gray"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : profile?.profilePhoto?.url || "public/images/user-avatar.png"
            }
            alt="profile "
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                // لما يختار صورة بنسيفها في الـ state
                onChange={(e) => setFile(e.target.files[0])}
              />
              {/* الزرار مش هيظهر غير لو الـ file فيه قيمة فعلاً */}
              {file && (
                <button type="submit" className="upload-profile-photo-btn">
                  Upload Now
                </button>
              )}
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username} </h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.length === 0 ? (
          <p className="no-posts-message">No posts yet.</p>
        ) : (
          profile?.posts?.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))
        )}
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
