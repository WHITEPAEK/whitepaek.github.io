---
isDraft: false
title: 문자열 정렬하기 (1)
pubDate: 2025-05-16
---

## 문제 설명

문자열 my_string이 매개변수로 주어질 때, my_string 안에 있는 숫자만 골라 오름차순 정렬한 리스트를 return 하도록 solution 함수를 작성해보세요.

## 제한사항

- 1 ≤ my_string의 길이 ≤ 100
- my_string에는 숫자가 한 개 이상 포함되어 있습니다.
- my_string은 영어 소문자 또는 0부터 9까지의 숫자로 이루어져 있습니다.

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n log n)
```java
import java.util.Arrays;

class Solution {
    public int[] solution(String my_string) {
        return my_string.chars()
            .filter(Character::isDigit)
            .map(c -> c - '0')
            .sorted()
            .toArray();
    }
}
```
