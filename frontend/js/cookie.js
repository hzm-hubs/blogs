export const getCookie = (name = "") => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === name + "=") {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

export const setCookie = (name = "", value = "", expiresNum = 5) => {
	let options = "; path=/";
	if (typeof expiresNum === "number") {
		let temp;
		temp = new Date(Date.now() + expiresNum * 864e5);
		if (temp) {
			temp = temp.toUTCString();
		}
		options += `; expires=${temp}`;
	}
	document.cookie = name + "=" + encodeURIComponent(value) + options;
	return true;
};

export const removeCookie = (name = "") => {
	let cookies = document.cookie || "";
	if (cookies) {
		cookies = cookies.split("; ");
		for (let i = 0; i < cookies.length; i++) {
			if (cookies[i].includes(`${name}=`)) {
				document.cookie = `${encodeURIComponent(
					name
				)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=-1; path=/;`;
			}
		}
	}
	return true;
};
