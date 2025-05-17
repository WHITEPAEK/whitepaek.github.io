---
isDraft: false
title: 뒤집힌 문자열
pubDate: 2025-05-15
---

## 문제 설명

문자열 my_string이 매개변수로 주어집니다. my_string을 거꾸로 뒤집은 문자열을 return 하도록 solution 함수를 완성해주세요.

- my_string이 "jaron"이므로 거꾸로 뒤집은 "noraj"를 return 합니다.
- my_string이 "bread"이므로 거꾸로 뒤집은 "daerb"를 return 합니다.

## 제한사항

- 1 ≤ my_string의 길이 ≤ 1,000

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String my_string) {
        int size = my_string.length();
        StringBuilder sb = new StringBuilder("");
        
        for (int i = 0; i < size; i++) {
            int position = size - 1 - i;
            sb.append(my_string.charAt(position));
        }
        
        return String.valueOf(sb);
    }
}
```

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String my_string) {
        return new StringBuilder(my_string).reverse().toString();
    }
}
```
