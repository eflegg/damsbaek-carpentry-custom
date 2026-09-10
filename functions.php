<?php

/**
 * Damsbaek functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Damsbaek Carpentry
 * @since Twenty Twenty-Six 1.0
 */

function mytheme_setup()
{
    add_theme_support('view-transitions');
}
add_action('after_setup_theme', 'mytheme_setup');


function dc_custom_scripts()
{

    global $post;

    wp_enqueue_script(
        'fse-custom-js', // Unique handle name for the script
        get_stylesheet_directory_uri() . '/js/dc-custom.js', // File path location
        array(), // Dependencies (e.g., array('jquery') if your code relies on jQuery)
        '1.0.0', // Version number
        true // Load in the footer (Highly recommended for page performance)
    );
    // Pass the post ID to your script
    wp_localize_script('fse-custom-js', 'wpData', array(
        'postId' => get_the_ID() // Grabs current post ID
    ));

    $parent_page_id = 45;
    // if (is_page($parent_page_id) || (is_page() && $post->post_parent == $parent_page_id)) {
    //     wp_enqueue_script(
    //         'projects-js', // Unique handle name for the script
    //         get_stylesheet_directory_uri() . '/js/dc-custom-projects.js', // File path location
    //         array(), // Dependencies (e.g., array('jquery') if your code relies on jQuery)
    //         '1.0.0', // Version number
    //         true // Load in the footer (Highly recommended for page performance)
    //     );
    //}

    wp_enqueue_style(
        'custom-style',
        get_theme_file_uri('/css/style.css'),
        array(),
        '1.0.0',
        'all'
    );
}
add_action('wp_enqueue_scripts', 'dc_custom_scripts');


function add_view_transition_to_post_thumbnail($html, $post_id, $post_thumbnail_id, $size, $attr)
{
    if (empty($html)) {
        return $html;
    }

    // Create a unique transition name using the post ID
    $transition_name = 'project-image-transition-' . esc_attr($post_id);

    // Inject the style attribute into the <img> tag
    $style = 'style="view-transition-name: ' . $transition_name . ';"';
    $html  = str_replace('<img ', '<img ' . $style . ' ', $html);

    return $html;
}
add_filter('post_thumbnail_html', 'add_view_transition_to_post_thumbnail', 10, 5);



//allow svg
function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');



/**
 * Minify and Defer JavaScript in WordPress
 */

// Defer parsing of all JavaScript files except jQuery and admin scripts
function defer_all_js($tag, $handle, $src)
{
    // Do not add defer to jQuery or admin-related scripts
    if (is_admin() || strpos($handle, 'jquery') !== false) {
        return $tag;
    }
    // Add defer attribute
    return str_replace('src', 'defer="defer" src', $tag);
}
add_filter('script_loader_tag', 'defer_all_js', 10, 3);

// Minify JavaScript content (uses PHP to compress output)
function minify_js($buffer)
{
    $buffer = preg_replace('/\s+/', ' ', $buffer); // Removes line breaks and excess whitespace
    $buffer = str_replace(array("\n", "\r", "\t"), '', $buffer); // Remove newlines, carriage returns, and tabs
    $buffer = preg_replace('/\s*([{}|:;,])\s+/', '$1', $buffer); // Removes spaces around symbols like {, }, :, ; etc.
    $buffer = preg_replace('/;}/', '}', $buffer); // Removes unnecessary semi-colons before closing braces
    return $buffer;
}

// Start output buffering for minification of inline and enqueued JavaScript
function start_minify_js()
{
    ob_start('minify_js'); // Start buffering and apply minification
}

// End output buffering and output minified JavaScript
function end_minify_js()
{
    ob_end_flush(); // End buffering and output the final content
}

// Hook into WordPress to start buffering at the beginning and flush it at the end
add_action('wp_head', 'start_minify_js', 0); // Start minification at the beginning of head section
add_action('wp_footer', 'end_minify_js', 9999); // Flush buffer at the end of the footer
