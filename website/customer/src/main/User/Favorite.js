export default function Favorite() {
  return (
    <div className="user-account-create" id="account-create">
      <div id="user-favorite">
        <h2>Sở thích của bạn</h2>
        <div>
          <div className="select-genre" id="selectGenre">
            <span
              className="color-test"
              onClick={() => {
                selectGenre(0, "gd");
              }}
            >
              Gia đình
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(1, "xh");
              }}
            >
              Văn hóa - Xã hội
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(2, "kn");
              }}
            >
              Kỹ năng
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(3, "vh");
              }}
            >
              Văn học
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(4, "tn");
              }}
            >
              Thiếu nhi
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(5, "kd");
              }}
            >
              Kinh doanh
            </span>
          </div>
          <div className="select-genre-text">
            Hãy cho chúng tôi biết bạn đang có
            <br />
            hứng thú với những thể loại nào nhé!
          </div>
          <button type="submit" className="select-genre-submit">
            Xác nhận
          </button>
          <div className="skip" onClick={() => {}}>
            Bỏ qua
          </div>
        </div>
      </div>
    </div>
  );
}
