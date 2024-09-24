本文介绍HTML5 <audio>音频元素的属性，方法，以及事件相关的API的基本使用。

本文内容对于HTML5 <video>视频元素同样受用。

内容有些多，完整阅读需要点时间，但很实用，可以先马后看。

### 一、audio使用基本案例

```js
<audio controls>
  <source src="audiofile.mp3" type="audio/mpeg">
  <source src="audiofile.ogg" type="audio/ogg">
  <!-- 如果浏览器不支持，则会呈现下面内容 -->
  <p>你的浏览器不支持HTML5音频，你可以<a href="audiofile.mp3">下载</a>这个音频文件。</p>
</audio>
```
上面做法是早些年HTML5 `<audio>`常用代码，因为那时候IE8还是大头，各大浏览器对各类音频格式支持情况参差不齐，因此，才借助`<source>`元素同时引用多个不同格式的音频文件，通过type属性指定mime type避免重复加载情况出现。

但是，如今已经不需要这么麻烦了。我们直接下面这样就可以了：
```
<audio src="audiofile.mp3" controls></audio>
```
音频文件常见下面3种格式，.ogg, .wav和.mp3，其中，.ogg Safari浏览器不支持（目前版本13），IE到Edge16都不支持；.wav则是IE-IE11不支持；但是.mp3 IE9+都支持。因此，我们如果不想麻烦，直接一个MP3格式就好了，由于就一种文件格式，因此type属性也可以不用设置。

//zxx: 也可以使用MP4视频文件，因为MP4视频也包含ACC编码音频，不过就是体积大了很多，不建议这么使用。

`<audio>`元素IE9浏览器就开始支持，现在00后都快20岁了，也不需要为低版本浏览器做降级适配了。因此，简简单单一个`<audio>`元素就可以了。

### 二、Audio HTML属性
下面看下`<audio>`元素属性相关的一些细节。

####  autoplay
```
<audio src="audiofile.mp3" autoplay></audio>
```
autoplay是个布尔属性值，表示声音是否自动播放，默认不自动播放。然而，随着浏览器的发展，这个属性变得限制越来越多。首先在移动端，autoplay自动播放已经被禁止了，PC端也已经禁止，18年的时候，Chrome这么做了，然后被很多开发者抗议，后来又恢复autoplay（给大家缓冲时间），现在已经Chrome又不支持自动播放了。

<code style="color:red">原因是网页在没有警告的情况下自发地发出声音，可能会让用户不愉快，体验不太好。因此，浏览器通常只允许在特定情况下成功地进行自动播放。</code>

关于更深入的autoplay策略可以参见MDN上的这篇[文档](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)。

不过根据我自己的一些实践，资源静音或者视频没有声音情况下，autoplay偶尔也是会执行的，不过都是偶现，触发自动播放原因不详。
####  loop
```
<audio src="audiofile.mp3" loop></audio>
```
loop是个布尔属性值，表示声音是否循环播放，默认不循环播放。loop属性适合用在可以不断循环的bgm背景音乐上。loop属性在各个平台，各个浏览器下的表现良好，大家可以放心使用。

JS设置音频循环播放可以：
```
document.querySelector('audio').loop = true;
```
#### muted
示意：
```
<audio src="audiofile.mp3" muted></audio>
```
muted也是个布尔属性值，表示音频是否静音，默认不静音播放。muted属性在各个平台，各个浏览器下的表现良好，大家可以放心使用。

JS设置音频静音可以：
```
document.querySelector('audio').muted = true;
```
#### preload
示意：
```
<audio src="audiofile.mp3" preload="auto"></audio>
```
preload可以指定音频的预加载策略，也就是在播放之前需要提前加载好音频的哪些资源。支持下面3个属性值：

1.none：表示在点击播放按钮之前不加载任何信息。

2.metadata: 下载音频的meta信息，就是视频长度，类型，还有作者（如果有）等信息。/li>

3.auto: 会尝试下载整个音频，如今5G都快来了，流量已经不值钱了，因此，我个人是更推荐使用

auto的，体验更好一点。然后，通常浏览器自己也会优化加载策略，不会所有音频文件都加载下来，只是会加载一部分，保证点击播放按钮的时候，可以立即播放。

preload属性在iOS Safari浏览器下是被禁止的（桌面端无此问题），对于一些对音频播放时间实际要求比较高的场合，会给我们开发带来困难。通常解决方法是，第一次触摸的时候，音频静音，同时触发音频play()然后很快再pause()，此时，可以有类似preload的预加载行为。

不过，Safari以后可能会改变preload在移动端的加载策略，因为越往后流量越不值钱，这种自以为是的优化反而会成为一种桎梏。

#### controls
示意：
```
<audio src="audiofile.mp3" controls></audio>
```
controls是个布尔属性值，表示声音是否显示音频播放暂停等控制器，默认是不显示的。

如果没有设置controls属性，整个音频文件播放面板都是完全隐藏的；如果有设置，则UI可能类似下面这张图（Chrome PC，设置了静音）。

不同浏览器，以及不同版本浏览器，其UI都不一样。如果是开发to用户侧产品，需要自定义音频播放器的UI，让各个浏览器下长相一致，大家可以去github上找找开源的项目。

#### src
示意：
```
<audio src="audiofile.mp3"></audio>
```
src属性表示音频的文件地址。可以用在`<audio>`元素上，也可以用在`<source>`元素上。`<audio>`元素上只能一个音频地址，使用`<source>`可以并列多个不同格式的音频文件。

#### type
```
<audio src="audiofile.mp3" type="audio/mpeg"></audio>
```
type属性用来指定音频文件的mime type类型。虽然不加type类型，浏览器也能正确播放音频文件，但通常建议加上type属性。当然，如果src音频格式不固定，则type属性反而推荐不加，错误的type不如没有type。

### 三、在JS中调用的audio属性

`<audio>`元素还有一些属性只能通过JavaScript设置，假设有HTML如下：
```
<audio id="myAudio" src="audiofile.mp3"></audio>
```
则：
#### currentTime
currentTime是一个可读兼可写的属性，用来设置或获取当前已经播放的时长，单位是秒。

例如：
```js
// 获取音频已经播放时长
var playedTime = myAudio.currentTime;
```
如果音频尚未开始播放，则playedTime的返回值是0。

我们也可以通过设置currentTime属性值，让我们的音频定位到我们希望的时间点进行播放，例如，从5秒那里开始播放，则：
```
// 跳到5秒那里
myAudio.currentTime = 5;
```
#### volume
volume也是一个可读兼可写的属性，用来设置或获取音频的音量大小，范围是0-1。
```
例如，设置音量50%，则：
// 设置音量50%
myAudio.volume = 0.5;
```
如果音频文件设置了muted为true，则myAudio.volume的返回值是0。

#### playbackRate
playbackRate是一个可读兼可写的属性，用来设置或获取当前媒体文件的播放速率，值为数值，例如：
```
// 获取音频播放速率
var audioSpeed = audio.playbackRate;
// 设置音频设置播放速率为正常速度的1.5倍
audio.playbackRate = 1.5;
```
速率范围
根据 [文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate) 显示，Gecko内核浏览器速率范围是0.25到5.0，超出这个范围就静音。
对于Chrome浏览器，我自己实地测试了下，速率上限居然可以到16，如下图：


然后，此属性兼容性不错，IE9+都支持。

####  paused
paused是一个只读属性，表示当前音频是否处于暂停状态。
```
// true或false
console.log(myAudio.paused);
未播放或者播放暂停都会返回true。
```

### 四、播放与暂停等JS方法

#### play()
音频播放示意，没有额外参数：
```
myAudio.play();
```
需要注意的是，目前在现代浏览器下，无论是桌面端还是移动端，执行myAudio.play()不总是有效果的。

目前策略是，web网页需要至少又一次可信任的用户行为后，才能myAudio.play()播放才可以执行，否则会报错。


可信任的用户行为包括`touchstart`触摸或者`click`点击。
更新于2020-11-20

Chrome浏览器50之后的版本， `<video>`或者`<audio>`执行play()方法后返回的是一个Promise。

play()方法是一个异步过程，如果先play()方法然后立即执行pause()方法会报错：
```
Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
```
即使加一个定时器（时间如果不是很足够），也会报这个错误，此时可以使用下面的语法：
```js
<script>
  // 播放开始，可能会显示loading
  var playPromise = audio.play();
 
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // 这里就已经开始播放了
      // 播放UI会出现（如果控件显示的话）
      // 此时可以安全的暂停音视频了
      audio.pause();
    }).catch(error => {
      // 无法自动播放
      // 显示暂停的UI
    });
  }
</script>
```
#### pause()

音频暂停示意，没有额外参数：
```
myAudio.pause();
```
音频元素是没有stop()方法的，如果你想要实现音频的stop()效果，可以先设置currentTime属性值为0，然后在执行pause()方法。

#### canPlayType()
canPlayType()可以用来检测浏览器是否支持某种类型的音频文件，支持一个mime type值作为参数。使用示意：
```
if (myAudio.canPlayType('audio/mpeg')) {
  // 如果支持mp3
  // 这里搞事情
}
```
canPlayType()方法可以返回下面三个值中的某一个：

1.probably

2.maybe

3.""（空字符串）

实际开发的时候，只要不是空字符串，我们都可以认为是支持的，因此，直接使用if弱匹配返回值即可，例如：

```
var myAudio = document.createElement('audio');

if (myAudio.canPlayType('audio/mpeg')) {
  myAudio.setAttribute('src','audiofile.mp3');
}

if (myAudio.canPlayType('audio/ogg')) {
  myAudio.setAttribute('src','audiofile.ogg');
}
```
#### load()
触发音频文件的加载。如果浏览器不支持preload属性，则此方法也不会有效果。
此方法没有额外参数：
```
myAudio.load();
```
### 五、音频媒体加载事件
下面讲讲关于音频加载及相关处理，根据我实际项目中的实践，这类加载事件在移动端，尤其iOS Safari并不总能触发，因为preload以及autoplay等属性的限制。

#### loadstart

loadstart事件简单地告诉我们加载过程已经开始，浏览器正在连接到媒体。
```
myAudio.addEventListener("loadstart", function() {
  // 抓取文件
});
```
#### durationchange
如果你想尽快知道音频文件的播放时长，则durationchange事件非常管用，因为音频文件默认duration初始值是NaN，当准确时长返回时候，会触发durationchange，此时我们就可以快速显示音频播放时间了。
通常实际开发，我们会使用00:00占位，durationchange事件触发后在替换为准确的总播放时间。
```
myAudio.addEventListener("durationchange", function() {
  // 可以显示播放时长了哟
});
```
#### loadedmetadata
当第一个音频文件字节数据到达时，会触发loadeddata事件。虽然播放头已经就位，但还没有准备好播放。
```
myAudio.addEventListener("loadeddata", function() {
  // 可以显示播放头
});
```
#### progress
progress事件在媒体文件仍然在下载中的时候触发，通常各种loading效果的显示就是在这个事件中。
```
myAudio.addEventListener("progress", function() {
  // 你可以让用户知道媒体文件正在下载
});
```
#### canplay
当媒体文件可以播放的时候会触发canplay事件。
我们在自定义音频播放器的时候，可以默认把一些按钮disabled禁用，等可以播放的时候再恢复为enabled，此时就可以使用canplay事件。
```
myAudio.addEventListener("canplay", function() {
  // 音频可以播放了
});
```
#### canplaythrough
canplaythrough事件在音频文件可以从头播放到尾时候触发。这种情况包括音频文件已经从头到尾加载完毕了，或者浏览器认为一定可以按时下载，不会发生缓冲停止。
```
myAudio.addEventListener("canplaythrough", function() {
  // 音频可以不发生缓冲从头播放到结束
});
```
### 音频事件触发的顺序

媒体事件加载顺序如下：

loadstart → durationchange → loadedmetadata → loadeddata → progress → canplay → canplaythrough

加载中断事件

还有一些事件实在媒体加载过程出现某种中断时将触发。

#### suspend

即使文件尚未完全下载，也不再拉取媒体数据。

#### abort

不是因为出错而导致的媒体数据下载中止。

#### error

媒体下载过程中错误。例如突然无网络了。或者文件地址不对。

#### emptied

媒体缓冲区已被清空，可能是由于错误或调用了load()方法重新加载。

#### stalled

媒体数据意外地不再可用。

### 六、音频媒体播放事件
下面介绍一些与媒体文件播放状态相关的一些事件。

#### timeupdate
每次currentTime属性值发生变化的时候会触发timeupdate事件。
实际开发的时候，这个事件每250毫秒出发一次。这个事件可用来实时显示播放进度。
```
myAudio.addEventListener("timeupdate", function() {
  // 更新与播放进度相关的内容
});
```

#### playing
音频文件在缺少媒体信息（如时长等）的时候，播放会被迫停止，如果之后在启动播放，会触发playing事件。

#### waiting
音频文件因为缺少媒体信息（如时长等）导致播放停止时会触发waiting事件。

#### play
play事件在play()方法生效，或者autoplay导致播放开始时候触发，此事件触发的播放状态一定是一个从暂停到播放。
#### pause
pause事件在pause()方法执行并生效后触发，此事件触发需要一个从播放到暂停的状态变化。
#### ended
当整个音频文件播放完毕的时候触发ended事件。
```
myAudio.addEventListener("ended", function() {
  // 当音轨播放完毕时候做你想做的事情
});
```
#### volumechange
音量发生变化的时候会触发volumechange事件，包括静音行为。
#### ratechange
播放速率发生变化的时候会触发ratechange事件。
### 七、缓冲相关的属性和方法
媒体文件的播放进度我们可以使用currentTime和duration属性获取，但是有时候，我们希望知道缓冲加载的进度，此时可以使用下面几个和缓冲相关属性和方法。

#### buffered
此属性让我们知道音频的哪些部分已被缓冲（提前下载）。它返回一个称为TimeRanges的对象。
```
myBufferedTimeRanges = myAudio.buffered;
```
#### seekable
seekable属性通知您是否可以直接跳到媒体的该部分，而不需要进一步缓冲。
```
mySeekableTimeRanges = myAudio.seekable;
```
Buffering相关事件

#### seeking
当媒体资源正在请求是会触发seeking事件。
#### seeked
当seeking属性变成false时候会触发seeked事件。
有关缓冲以及TimeRanges更深入具体的知识，可以参见这篇MDN文档。
### 八、结语与参考文档
本文展示的这些`<audio>`音频元素相关的属性和方法以及各种回调事件，对于`<video>`视频元素同样受用，基本上都是一模一样的，很多自动播放以及媒体自动加载策略也是一致的。


[参考文档](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics)
