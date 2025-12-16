var findMedianSortedArrays = function (nums1, nums2) {
	let result = nums1;
	let startIndex = 0;
	for (let i = 0; i < Math.round(nums2.length / 2); i++) {
		while (startIndex < result.length) {
			if (result[startIndex] >= nums2[i]) {
				break;
			}
			startIndex += 1;
		}
		result.splice(startIndex, 0, nums2[i]);
	}
	console.log("result", result);
	const middleIndex = result.length / 2;
	let middleValue;
	console.log("middleIndex", middleIndex);
	if (String(middleIndex).indexOf(".") > -1) {
		middleValue = result[Math.floor(middleIndex)];
	} else {
		middleValue = (result[middleIndex - 1] + result[middleIndex]) / 2;
	}
	return middleValue;
};

var findMedianSortedArrays2 = function (nums1, nums2) {
	const averageLen = (nums1.length + nums2.length) / 2;
	const isRemain = String(averageLen).includes(".");
	const maxLen = Math.floor(averageLen);
	let i = 0,
		j = 0;
	let result = [];
	while (i + j <= maxLen) {
		if (nums1[i] == nums2[j] && nums1[i] !== undefined) {
			result.push(nums1[i]);
			result.push(nums2[j]);
			i += 1;
			j += 1;
		} else if (nums1[i] !== undefined && nums2[j] !== undefined) {
			if (nums1[i] < nums2[j]) {
				result.push(nums1[i]);
				i += 1;
			} else {
				result.push(nums2[j]);
				j += 1;
			}
		} else if (nums1[i] !== undefined) {
			result.push(nums1[i]);
			i += 1;
		} else if (nums2[j] !== undefined) {
			result.push(nums2[j]);
			j += 1;
		} else {
			break;
		}
	}
	console.log("result", result);
	const middleValue = isRemain
		? result[maxLen]
		: (result[maxLen - 1] + result[maxLen]) / 2;
	console.log("middleValue", middleValue);
	return middleValue;
};

// findMedianSortedArrays2([1, 10], [2, 3, 4, 5, 6]);

function a(s) {
	// 推入栈的概念 先入后出 就是最中间的一堆一定要是闭合的
	const openning = ["{", "(", "["];
	const closing = ["}", ")", "]"];
	let stack = [];
	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (openning.includes(char)) {
			stack.push(char);
		} else if (closing.includes(char)) {
			const lastOpening = stack.pop();
			if (openning.indexOf(lastOpening) !== closing.indexOf(char)) {
				return false;
			}
		}
	}
	return stack.length === 0;
}

a("([])");
