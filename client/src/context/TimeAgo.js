export default function timeAgo(inputTime) {
    const now = new Date();
    const time = new Date(inputTime);
    const diff = now - time;

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    if (diff < msPerMinute) {
      const seconds = Math.round(diff / 1000);
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (diff < msPerHour) {
      const minutes = Math.round(diff / msPerMinute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diff < msPerDay) {
      const hours = Math.round(diff / msPerHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diff < msPerDay * 2) {
      return "1 day ago";
    } else if (diff < msPerDay * 7) {
      const days = Math.round(diff / msPerDay);
      return `${days} days ago`;
    } else {
      // For times older than a week, return the formatted date
      return time.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  }
  // export const  Server="https://blog-app-nu-hazel.vercel.app/"
  export const  Server="http://localhost:8000/"
