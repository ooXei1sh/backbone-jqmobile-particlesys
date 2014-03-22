<?php

// function sanitize($data) {
//     if (is_array($data)) {
//         foreach ( $data as $key => $value ) {
//             $data[htmlspecialchars($key)] = sanitize($value);
//         }
//     } else if (is_object($data)) {
//         $values = get_class_vars(get_class($data));
//         foreach ( $values as $key => $value ) {
//             $data->{htmlspecialchars($key)} = sanitize($value);
//         }
//     } else {
//         $data = htmlspecialchars($data);
//     }
//     return $data;
// }
