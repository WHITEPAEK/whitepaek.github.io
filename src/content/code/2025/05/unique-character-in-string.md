---
isDraft: false
title: 한 번만 등장한 문자
pubDate: 2025-05-18
---

## 문제 설명

문자열 s가 매개변수로 주어집니다. s에서 한 번만 등장하는 문자를 사전 순으로 정렬한 문자열을 return 하도록 solution 함수를 완성해보세요. 한 번만 등장하는 문자가 없을 경우 빈 문자열을 return 합니다.

- "abcabcadc"에서 하나만 등장하는 문자는 "d"입니다.
- "abdc"에서 모든 문자가 한 번씩 등장하므로 사전 순으로 정렬한 "abcd"를 return 합니다.
- "hello"에서 한 번씩 등장한 문자는 "heo"이고 이를 사전 순으로 정렬한 "eho"를 return 합니다.

## 제한사항

- 0 < s의 길이 < 1,000
- s는 소문자로만 이루어져 있습니다.

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
import java.util.stream.*;

class Solution {
    public String solution(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;

        return IntStream.range(0, 26)
            .filter(i -> count[i] == 1)
            .mapToObj(i -> String.valueOf((char)(i + 'a')))
            .sorted()
            .collect(Collectors.joining());
    }
}
```
