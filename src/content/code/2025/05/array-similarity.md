---
isDraft: false
title: 배열의 유사도
pubDate: 2025-05-15
---

## 문제 설명

두 배열이 얼마나 유사한지 확인해보려고 합니다. 문자열 배열 s1과 s2가 주어질 때 같은 원소의 개수를 return 하도록 solution 함수를 완성해주세요.

- s1과 s2의 "b"와 "c"가 같으므로 2를 return 합니다.
- 같은 원소가 없으므로 0을 return 합니다.

## 제한사항

- 1 ≤ s1, s2의 길이 ≤ 100
- 1 ≤ s1, s2의 원소의 길이 ≤ 10
- s1과 s2의 원소는 알파벳 소문자로만 이루어져 있습니다.
- s1과 s2는 각각 중복된 원소를 갖지 않습니다.

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n x m)
```java
class Solution {
    public int solution(String[] s1, String[] s2) {
        int answer = 0;
        
        for (int i = 0; i < s1.length; i++) {
            for (int j = 0; j < s2.length; j++) {
                if (s1[i].equals(s2[j])) {
                    answer += 1;
                    break;
                }
            }
        }
        
        return answer;
    }
}
```

#### Review Code
- 시간복잡도: O(n + m)
```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int solution(String[] s1, String[] s2) {
        Set<String> set = new HashSet<>();
        for (String str : s1) {
            set.add(str);
        }

        int count = 0;
        for (String str : s2) {
            if (set.contains(str)) {
                count++;
            }
        }

        return count;
    }
}
```

- 시간복잡도: O(n + m)
```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int solution(String[] s1, String[] s2) {
        Set<String> set = new HashSet<>(Arrays.asList(s1));
        return (int) Arrays.stream(s2).filter(set::contains).count();
    }
}
```