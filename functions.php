<?php
function my_scripts() {
  //css
wp_enqueue_style( 'main-style', get_template_directory_uri() . '/css/style.css', array(), '1.0.1', 'all' );

//javascript
wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_scripts' );
add_theme_support( 'post-thumbnails' );//アイキャッチ画像をON
add_theme_support( 'menus');//メニュー機能をON


//wordpressの更新を可能にする
function set_fs_method($args) {
	return 'direct';
}
add_filter('filesystem_method','set_fs_method');

function get_thumb_img($size = 'full') {

  $thumb_id = get_post_thumbnail_id();                         // アイキャッチ画像のIDを取得

  $thumb_img = wp_get_attachment_image_src($thumb_id, $size);  // $sizeサイズの画像内容を取得

  $thumb_src = $thumb_img[0];    // 画像のurlだけ取得

  $thumb_alt = get_the_title();  //alt属性に入れるもの（記事のタイトルにしています）

  return '<img src="'.$thumb_src.'" alt="'.$thumb_alt.'">';
}

//自動整形無効にする（pタグとかが自動で入ってしまうのを防ぐ）
add_filter('the_content', 'wpautop_filter', 9);
function wpautop_filter($content) {
  global $post;
  $remove_filter = false;

  $arr_types = array('page'); //自動整形を無効にする投稿タイプを記述 ＝固定ページ
  $post_type = get_post_type( $post->ID );
  if (in_array($post_type, $arr_types)){
                $remove_filter = true;
        }

  if ( $remove_filter ) {
    remove_filter('the_content', 'wpautop');
    remove_filter('the_excerpt', 'wpautop');
  }

  return $content;
}

?>
