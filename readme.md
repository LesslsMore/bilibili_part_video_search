# bili-part-video-search

1. 获取 up 所有投稿视频信息保存为 `./up/${mid}/${p}.json` 按分页保存
用完注释函数，否定被其他文件调用参数时会运行，
参数配置化 json yaml 文件

2. 从 `./up/${mid}/${p}.json` 读取 up 所有视频信息文件，从每分页中获取 bvid 信息

3. 根据 bvid 调用 api 获取各视频分页信息，并保存文件至 `./up/${mid}/bvid/${bvid}.json` 
异步，调用完注释

4. 根据各视频信息提取各分 p url 和名称，保存为 item_info

5. 遍历所有信息将保存到 bvid_page.json 文件