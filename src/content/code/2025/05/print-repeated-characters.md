---
isDraft: false
title: 문자 반복 출력
pubDate: 2025-05-15
---

## 문제 설명

문자열 my_string과 정수 n이 매개변수로 주어질 때, my_string에 들어있는 각 문자를 n만큼 반복한 문자열을 return 하도록 solution 함수를 완성해보세요.

- "hello"의 각 문자를 세 번씩 반복한 "hhheeellllllooo"를 return 합니다.

## 제한사항

- 2 ≤ my_string 길이 ≤ 5
- 2 ≤ n ≤ 10
- "my_string"은 영어 대소문자로 이루어져 있습니다.

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(m x n)
```java
class Solution {
    public String solution(String my_string, int n) {
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < my_string.length(); i++) {
            for (int j = 0; j < n; j++) {
                sb.append(my_string.charAt(i));
            }
        }
        
        return String.valueOf(sb);
    }
}
```

#### Review Code
- 시간복잡도: O(m x n)
```java
class Solution {
    public String solution(String my_string, int n) {
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < my_string.length(); i++) {
            char ch = my_string.charAt(i);
            sb.append(String.valueOf(ch).repeat(n));
        }

        return sb.toString();
    }
}
```