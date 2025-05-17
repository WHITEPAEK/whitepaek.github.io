---
isDraft: false
title: 인덱스 바꾸기
pubDate: 2025-05-16
---

## 문제 설명

문자열 my_string과 정수 num1, num2가 매개변수로 주어질 때, my_string 에서 인덱스 num1과 인덱스 num2에 해당하는 문자를 바꾼 문자열을 return 하도록 solution 함수를 완성해보세요.

- "hello"의 1번째 인덱스인 "e"와 2번째 인덱스인 "l"을 바꾸면 "hlelo"입니다.
- "I love you"의 3번째 인덱스 "o"와 " "(공백)을 바꾸면 "I l veoyou"입니다.

## 제한사항

- 1 < my_string의 길이 < 100
- 0 ≤ num1, num2 < my_string의 길이
- my_string은 소문자로 이루어져 있습니다.
- num1 ≠ num2

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String my_string, int num1, int num2) {
        StringBuilder sb = new StringBuilder();
        
        char c1 = my_string.charAt(num1);
        char c2 = my_string.charAt(num2);
        
        for (int i = 0; i < my_string.length(); i++) {
            if (i == num1) {
                sb.append(c2);
            } else if (i == num2) {
                sb.append(c1);
            } else {
                sb.append(my_string.charAt(i));
            }
        }
        
        return sb.toString();
    }
}
```

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String my_string, int num1, int num2) {
        char[] chars = my_string.toCharArray();

        char temp = chars[num1];
        chars[num1] = chars[num2];
        chars[num2] = temp;

        return new String(chars);
    }
}
```
