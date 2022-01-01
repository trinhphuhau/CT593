import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import Axios from "axios";
import Modal from "../Components/Modal";

export default function AddNewMessage(props) {
  const { getMessages } = props;
  const [newMessage, setNewMessage] = useState("");
  const addNewMessage = () => {
    const data = {
      user_id: 1,
      message: newMessage,
    };
    Axios.post(
      "http://localhost:3001/admin/message/add-new-message",
      data
    ).then((res) => {
      getMessages();
      console.log(res.data);
    });
  };
  return (
    <div className="bg-light mt-4">
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2">Thêm thông báo mới</h1>
        <div className="pb-4 mt-3">
          <CKEditor
            editor={ClassicEditor}
            config={{ placeholder: "Mô tả của sản phẩm..." }}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewMessage(data);
            }}
          />
          <input
            type="button"
            className="btn btn-primary w-100 mt-3"
            value="Thêm thông báo mới"
            data-bs-toggle="modal"
            data-bs-target="#addNewMessageModal"
          />
          <Modal
            id="addNewMessageModal"
            label="addNewMessageModalLabel"
            title="Xác nhận thêm thông báo"
            text="Bạn đồng ý muốn thêm thông báo này chứ?"
            closeBtn="Hủy bỏ"
            saveBtn="Đồng ý"
            save={addNewMessage}
          />
        </div>
      </div>
    </div>
  );
}
