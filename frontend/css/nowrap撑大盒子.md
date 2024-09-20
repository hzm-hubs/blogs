flex布局，两行，一个是标题，一个是属性。想实现的功能，标题超长“......”省略号代替。
出现一个问题就是，内容过长，会撑大盒子宽度。虽然不显示，但是会影响下面一行属性的显示。通过给父盒子添加min-width：0；解决。
```css
.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 150rpx;
  margin: 10rpx;
  min-width: 0;//解决white-space: nowrap;撑大盒子问题
}
 
.item-content-top {
  font-size: 28rpx;
  font-weight: 500;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
}
 
.item-content-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 
}
```