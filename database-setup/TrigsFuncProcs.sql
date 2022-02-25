
create sequence user_seq;

create or replace trigger person_insert_trig
   before insert on PERSON
   for each row
begin
   if :new.PERSON_ID is null
   then
      :new.PERSON_ID := user_seq.nextval;
   end if;
end;
/


create sequence publisher_seq;	

CREATE OR REPLACE TRIGGER PUBLISHER_INSERT_TRIG
	 BEFORE INSERT ON PUBLISHER
   FOR EACH ROW
BEGIN
	 IF :NEW.PUBLISHER_ID IS NULL
	 THEN 
	:NEW.PUBLISHER_ID := publisher_seq.nextval;
   END IF;
END;
/


create sequence genre_seq;	

CREATE OR REPLACE TRIGGER GENRE_INSERT_TRIG
	 BEFORE INSERT ON GENRE
   FOR EACH ROW
BEGIN
	 IF :NEW.GENRE_ID IS NULL
	 THEN 
	:NEW.GENRE_ID := genre_seq.nextval;
   END IF;
END;
/

create sequence bookshelf_seq;

create or replace trigger bookshelf_insert_trig
   before insert on BOOKSHELF
   for each row
begin
   if :new.BOOKSHELF_ID is null
   then
      :new.BOOKSHELF_ID := bookshelf_seq.nextval;
   end if;
end;
/

create sequence review_seq;

create or replace trigger review_insert_trig
   before insert on REVIEW
   for each row
begin
   if :new.REVIEW_ID is null
   then
      :new.REVIEW_ID := review_seq.nextval;
   end if;
end;
/

create or replace FUNCTION IS_VALID_USER_INSERT(USERNAME IN VARCHAR2, UEMAIL IN VARCHAR2)
return BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM "USER" WHERE USER_NAME = USERNAME;
	IF COUNTER = 0 THEN
		SELECT COUNT(*) INTO COUNTER2 FROM PERSON WHERE EMAIL = UEMAIL;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/

create or replace FUNCTION IS_VALID_ADMIN_INSERT(USERNAME IN VARCHAR2, UEMAIL IN VARCHAR2)
return BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM ADMIN WHERE ADMIN_NAME = USERNAME;
	IF COUNTER = 0 THEN
		SELECT COUNT(*) INTO COUNTER2 FROM PERSON WHERE EMAIL = UEMAIL;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/

create or replace FUNCTION IS_VALID_AUTHOR_INSERT(AEMAIL IN VARCHAR2)
return BOOLEAN IS
	COUNTER NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM PERSON WHERE EMAIL = AEMAIL;
	IF COUNTER = 0 THEN
		RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_PUBLISHER(P_NAME IN VARCHAR2, P_EMAIL IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM PUBLISHER WHERE (UPPER(NAME) = UPPER(P_NAME) OR EMAIL_ID = P_EMAIL);
	IF COUNTER = 0 THEN
		RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/





CREATE OR REPLACE FUNCTION IS_VALID_GENRE(G_NAME IN VARCHAR2) RETURN BOOLEAN IS
	TG_NAME VARCHAR2(100);
BEGIN
	SELECT GENRE_NAME INTO TG_NAME FROM GENRE WHERE UPPER(GENRE_NAME) = UPPER(G_NAME);
	RETURN FALSE;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		RETURN TRUE;
	WHEN OTHERS THEN
		DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/





CREATE OR REPLACE FUNCTION IS_VALID_ISBN(GIVEN_ISBN IN VARCHAR2) RETURN BOOLEAN IS
	F_ISBN VARCHAR2(20);
BEGIN
	SELECT ISBN INTO F_ISBN FROM BOOK WHERE ISBN = GIVEN_ISBN;
	RETURN FALSE;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		RETURN TRUE;
	WHEN OTHERS THEN
		DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_TITLE(GIVEN_TITLE IN VARCHAR2) RETURN BOOLEAN IS
	F_TITLE VARCHAR2(100);
BEGIN
	SELECT TITLE INTO F_TITLE FROM BOOK WHERE UPPER(TITLE) = UPPER(GIVEN_TITLE); 
	RETURN FALSE;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		RETURN TRUE;
	WHEN OTHERS THEN
		DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/



CREATE OR REPLACE FUNCTION IS_VALID_DELETE_AUTHOR(A_ID IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM WRITTEN_BY WHERE PERSON_ID = A_ID;
	IF COUNTER = 0 THEN
		RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_DELETE_GENRE(G_ID IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM BOOK_GENRE WHERE GENRE_ID = G_ID;
	IF COUNTER = 0 THEN
		RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_DELETE_PUBLISHER(P_ID IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM BOOK WHERE PUBLISHER_ID = P_ID;
	IF COUNTER = 0 THEN
		RETURN TRUE;
	ELSE 
		RETURN FALSE;
	END IF;
END;
/



CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_AUTHOR(P_ID IN VARCHAR2, AMAIL IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM AUTHOR WHERE PERSON_ID = P_ID;
	IF COUNTER = 0 THEN
		RETURN FALSE;
	ELSE 
		SELECT COUNT(*) INTO COUNTER2 FROM PERSON WHERE EMAIL = AMAIL AND PERSON_ID <> P_ID;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	END IF;
END;
/




CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_PUBLISHER(P_ID IN VARCHAR2, PMAIL IN VARCHAR2, P_NAME IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM PUBLISHER WHERE PUBLISHER_ID = P_ID;
	IF COUNTER = 0 THEN
		RETURN FALSE;
	ELSE 
		SELECT COUNT(*) INTO COUNTER2 FROM PUBLISHER WHERE (UPPER(NAME) = UPPER(P_NAME) OR EMAIL_ID = PMAIL) AND PUBLISHER_ID <> P_ID;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	END IF;
END;
/





CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_GENRE(G_ID IN VARCHAR2, G_NAME IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM GENRE WHERE GENRE_ID = G_ID;
	IF COUNTER = 0 THEN
		RETURN FALSE;
	ELSE 
		SELECT COUNT(*) INTO COUNTER2 FROM GENRE WHERE UPPER(GENRE_NAME) = UPPER(G_NAME) AND GENRE_ID <> G_ID;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	END IF;
END;
/





-- new updates
CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_USER(P_ID IN VARCHAR2, UEMAIL IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM "USER" WHERE PERSON_ID = P_ID;
	IF COUNTER = 0 THEN
		RETURN FALSE;
	ELSE 
		SELECT COUNT(*) INTO COUNTER2 FROM PERSON WHERE EMAIL = UEMAIL AND PERSON_ID <> P_ID;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_ADMIN(P_ID IN VARCHAR2, AEMAIL IN VARCHAR2) RETURN BOOLEAN IS
	COUNTER NUMBER;
	COUNTER2 NUMBER;
BEGIN
	SELECT COUNT(*) INTO COUNTER FROM ADMIN WHERE PERSON_ID = P_ID;
	IF COUNTER = 0 THEN
		RETURN FALSE;
	ELSE 
		SELECT COUNT(*) INTO COUNTER2 FROM PERSON WHERE EMAIL = AEMAIL AND PERSON_ID <> P_ID;
		IF COUNTER2 = 0 THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	END IF;
END;
/



-- procedures
CREATE OR REPLACE PROCEDURE UPDATE_USER(A_ID IN VARCHAR2, A_FIRST_NAME IN VARCHAR2, A_LAST_NAME IN VARCHAR2, A_ADDRESS IN VARCHAR2, A_EMAIL IN VARCHAR2, A_PHONE_NUMBER IN VARCHAR2, A_DETAILS IN VARCHAR2) IS 
BEGIN 
	IF (IS_VALID_UPDATE_USER(A_ID, A_EMAIL)) THEN
		UPDATE PERSON
		SET FIRST_NAME = A_FIRST_NAME, LAST_NAME = A_LAST_NAME, ADDRESS = A_ADDRESS, EMAIL = A_EMAIL, PHONE_NUMBER = A_PHONE_NUMBER, DETAILS = A_DETAILS
		WHERE PERSON_ID = A_ID;
	ELSE 
		raise_application_error(-20111,'USER CANNOT BE UPDATED');
	END IF;
END;
/



CREATE OR REPLACE PROCEDURE UPDATE_ADMIN(A_ID IN VARCHAR2, A_FIRST_NAME IN VARCHAR2, A_LAST_NAME IN VARCHAR2, A_ADDRESS IN VARCHAR2, A_EMAIL IN VARCHAR2, A_PHONE_NUMBER IN VARCHAR2, A_DETAILS IN VARCHAR2) IS 
BEGIN 
	IF (IS_VALID_UPDATE_ADMIN(A_ID, A_EMAIL)) THEN
		UPDATE PERSON
		SET FIRST_NAME = A_FIRST_NAME, LAST_NAME = A_LAST_NAME, ADDRESS = A_ADDRESS, EMAIL = A_EMAIL, PHONE_NUMBER = A_PHONE_NUMBER, DETAILS = A_DETAILS
		WHERE PERSON_ID = A_ID;
	ELSE 
		raise_application_error(-20111,'ADMIN CANNOT BE UPDATED');
	END IF;
END;
/








CREATE OR REPLACE PROCEDURE INSERT_USER(FN IN VARCHAR2, LN IN VARCHAR2, AD IN VARCHAR2, EM IN VARCHAR2, PH_NUM IN VARCHAR2, DET IN VARCHAR2, UN IN VARCHAR2, PW IN VARCHAR2) 
IS
	ID NUMBER;
BEGIN
	IF IS_VALID_USER_INSERT(UN, EM) THEN
		INSERT INTO "PERSON" ("FIRST_NAME", "LAST_NAME", "ADDRESS", "EMAIL", "PHONE_NUMBER", "DETAILS") VALUES (FN, LN, AD, EM, PH_NUM, DET);
		select user_seq.currval into ID from DUAL;
		INSERT INTO "USER" ("PERSON_ID", "USER_NAME", "PASSWORD") VALUES (ID, UN, PW);
	ELSE
		raise_application_error(-20111,'USERNAME OR EMAIL IS NOT UNIQUE');
	END IF;
END ;
/



CREATE OR REPLACE PROCEDURE INSERT_ADMIN(FN IN VARCHAR2, LN IN VARCHAR2, AD IN VARCHAR2, EM IN VARCHAR2, PH_NUM IN VARCHAR2, DET IN VARCHAR2, AN IN VARCHAR2, PW IN VARCHAR2) 
IS
	ID NUMBER;
BEGIN
	IF IS_VALID_ADMIN_INSERT(AN, EM) THEN
		INSERT INTO "PERSON" ("FIRST_NAME", "LAST_NAME", "ADDRESS", "EMAIL", "PHONE_NUMBER", "DETAILS") VALUES (FN, LN, AD, EM, PH_NUM, DET);
		select user_seq.currval into ID from DUAL;
		INSERT INTO "ADMIN" ("PERSON_ID", "ADMIN_NAME", "PASSWORD") VALUES (ID, AN, PW);
	ELSE
		raise_application_error(-20111,'ADMIN_NAME OR EMAIL IS NOT UNIQUE');
	END IF;
END ;
/


CREATE OR REPLACE PROCEDURE INSERT_AUTHOR(FN IN VARCHAR2, LN IN VARCHAR2, AD IN VARCHAR2, EM IN VARCHAR2, PH_NUM IN VARCHAR2, DET IN VARCHAR2, WA IN VARCHAR2) 
IS
	ID NUMBER;
BEGIN
	IF(IS_VALID_AUTHOR_INSERT(EM)) THEN 
		INSERT INTO "PERSON" ("FIRST_NAME", "LAST_NAME", "ADDRESS", "EMAIL", "PHONE_NUMBER", "DETAILS") VALUES (FN, LN, AD, EM, PH_NUM, DET);
	select user_seq.currval into ID from DUAL;
	INSERT INTO "AUTHOR" ("PERSON_ID", "WEB_ADDRESS") VALUES (ID, WA);
	ELSE 
		raise_application_error(-20111,'EMAIL IS NOT UNIQUE');
	END IF;
END ;
/


CREATE OR REPLACE PROCEDURE REVIEW_POST(ID IN VARCHAR2, ISB IN VARCHAR2, VAL IN VARCHAR2) IS
	RVAL VARCHAR2(2000);
BEGIN
	SELECT REVIEW_CONTENT INTO RVAL FROM REVIEW WHERE ISBN = ISB AND PERSON_ID = ID;
	UPDATE REVIEW SET REVIEW_CONTENT = VAL, REVIEW_DATE = SYSDATE WHERE ISBN = ISB AND PERSON_ID = ID;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
			INSERT INTO REVIEW(ISBN, PERSON_ID, REVIEW_CONTENT, REVIEW_DATE) VALUES (ISB, ID, VAL, SYSDATE);
	WHEN OTHERS THEN
			DBMS_OUTPUT.PUT_LINE('Some Error Occured');
END ;
/


CREATE OR REPLACE PROCEDURE RATE(ID IN VARCHAR2, ISB IN VARCHAR2, VAL IN NUMBER) IS
	RVAL NUMBER(1);
BEGIN
	SELECT VALUE INTO RVAL FROM RATING WHERE ISBN = ISB AND PERSON_ID = ID;
	UPDATE RATING SET VALUE = VAL, RATING_DATE = SYSDATE WHERE ISBN = ISB AND PERSON_ID = ID;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
			INSERT INTO RATING(ISBN, PERSON_ID, VALUE, RATING_DATE) VALUES (ISB, ID, VAL, SYSDATE);
	WHEN OTHERS THEN
			DBMS_OUTPUT.PUT_LINE('Some Error Occured');
END ;
/




CREATE OR REPLACE PROCEDURE INSERT_BOOK_GENRE(B_ISBN IN VARCHAR2, G_ID IN VARCHAR2) IS 
	P VARCHAR2(20);
BEGIN
	SELECT ISBN INTO P FROM BOOK_GENRE WHERE (ISBN = B_ISBN AND GENRE_ID = G_ID);
	DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		INSERT INTO BOOK_GENRE VALUES(B_ISBN, G_ID);
	WHEN OTHERS THEN
			DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/

CREATE OR REPLACE PROCEDURE INSERT_BOOK_AWARD(B_ISBN IN VARCHAR2, A IN VARCHAR2) IS 
	P VARCHAR2(20);
BEGIN
	SELECT ISBN INTO P FROM BOOK_AWARD WHERE (ISBN = B_ISBN AND UPPER(AWARDS) = UPPER(A));
	DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		INSERT INTO BOOK_AWARD VALUES(B_ISBN, A);
	WHEN OTHERS THEN
			DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/
	
CREATE OR REPLACE PROCEDURE INSERT_WRITTEN_BY(B_ISBN IN VARCHAR2, P_ID IN VARCHAR2) IS 
P VARCHAR2(20);
BEGIN
	SELECT ISBN INTO P FROM WRITTEN_BY WHERE (ISBN = B_ISBN AND PERSON_ID = P_ID);
	DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		INSERT INTO WRITTEN_BY VALUES(B_ISBN, P_ID);
	WHEN OTHERS THEN
			DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/


CREATE OR REPLACE PROCEDURE INSERT_BOOK(ISBN IN VARCHAR2, TITLE IN VARCHAR2, COVER_IMAGE IN VARCHAR2, BINDING IN VARCHAR2, NUMBER_OF_PAGES IN NUMBER, ORIGINAL_PUBLICATION_YEAR IN NUMBER, LANGUAGE IN VARCHAR2, DESCRIPTION IN VARCHAR2, SUMMARY IN VARCHAR2, PUBLISHER_ID IN VARCHAR2, PUBLICATION_DATE IN DATE) IS
BEGIN
	IF (IS_VALID_TITLE(TITLE) AND IS_VALID_ISBN(ISBN)) THEN
		INSERT INTO BOOK("ISBN", "TITLE", "BINDING", "NUMBER_OF_PAGES", "COVER_IMAGE", "ORIGINAL_PUBLICATION_YEAR", "LANGUAGE", "DESCRIPTION", "SUMMARY", "PUBLISHER_ID", "PUBLICATION_DATE") VALUES(ISBN, TITLE, BINDING, NUMBER_OF_PAGES, COVER_IMAGE, ORIGINAL_PUBLICATION_YEAR, LANGUAGE, DESCRIPTION, SUMMARY, PUBLISHER_ID, PUBLICATION_DATE);
	ELSE
		raise_application_error(-20111,'TITLE OR ISBN NOT UNIQUE'); 
	END IF;
END;
/



CREATE OR REPLACE PROCEDURE INSERT_GENRE(GENRE_NAME IN VARCHAR2) IS
BEGIN
	IF(IS_VALID_GENRE(GENRE_NAME)) THEN
		--select genre_seq.currval into ID from DUAL;
		INSERT INTO GENRE("GENRE_NAME") VALUES (GENRE_NAME);
	ELSE
		raise_application_error(-20111,'GENRE NAME IS ALREADY USED');
	END IF;
END;
/




CREATE OR REPLACE PROCEDURE INSERT_PUBLISHER(NAME IN VARCHAR2, ADDRESS IN VARCHAR2, EMAIL_ID IN VARCHAR2, WEB_ADDRESS IN VARCHAR2) IS
BEGIN
	IF(IS_VALID_PUBLISHER(NAME, EMAIL_ID)) THEN
		INSERT INTO PUBLISHER("NAME", "ADDRESS", "EMAIL_ID", "WEB_ADDRESS") VALUES (NAME, ADDRESS, EMAIL_ID, WEB_ADDRESS);
	ELSE
		raise_application_error(-20111,'PUBLISHER NAME OR EMAIL NOT UNIQUE');
	END IF;
END;
/



CREATE OR REPLACE PROCEDURE DELETE_BOOK_GENRE(B_ISBN IN VARCHAR2, G_ID IN VARCHAR2) IS
	P VARCHAR2(20);
BEGIN
	SELECT ISBN INTO P FROM BOOK_GENRE WHERE (ISBN = B_ISBN AND GENRE_ID = G_ID);
	DELETE FROM BOOK_GENRE WHERE (ISBN = B_ISBN AND GENRE_ID = G_ID);
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		DBMS_OUTPUT.PUT_LINE('BOOK NOT FOUND IN GIVEN GENRE');
	WHEN OTHERS THEN
		DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/


CREATE OR REPLACE PROCEDURE DELETE_PUBLISHER(P_ID IN VARCHAR2) IS	
BEGIN
	IF(IS_VALID_DELETE_PUBLISHER(P_ID)) THEN
		DELETE FROM PUBLISHER WHERE PUBLISHER_ID = P_ID;
	ELSE 
		raise_application_error(-20111,'PUBLISHER CANNOT BE DELETED');
	END IF;
END;
/




CREATE OR REPLACE PROCEDURE DELETE_AUTHOR(A_ID IN VARCHAR2) IS
BEGIN
	IF(IS_VALID_DELETE_AUTHOR(A_ID)) THEN
		DELETE FROM AUTHOR WHERE PERSON_ID = A_ID;
		DELETE FROM PERSON WHERE PERSON_ID = A_ID;
	ELSE 
		raise_application_error(-20111,'AUTHOR CANNOT BE DELETED');
	END IF;
END;
/




CREATE OR REPLACE PROCEDURE UPDATE_AUTHOR(A_ID IN VARCHAR2, A_FIRST_NAME IN VARCHAR2, A_LAST_NAME IN VARCHAR2, A_ADDRESS IN VARCHAR2, A_EMAIL IN VARCHAR2, A_PHONE_NUMBER IN VARCHAR2, A_DETAILS IN VARCHAR2, A_WEB_ADDRESS IN VARCHAR2) IS 
BEGIN 
	IF (IS_VALID_UPDATE_AUTHOR(A_ID, A_EMAIL)) THEN
		UPDATE PERSON
		SET FIRST_NAME = A_FIRST_NAME, LAST_NAME = A_LAST_NAME, ADDRESS = A_ADDRESS, EMAIL = A_EMAIL, PHONE_NUMBER = A_PHONE_NUMBER, DETAILS = A_DETAILS
		WHERE PERSON_ID = A_ID;
		UPDATE AUTHOR SET WEB_ADDRESS = A_WEB_ADDRESS WHERE PERSON_ID = A_ID;
	ELSE 
		raise_application_error(-20111,'AUTHOR CANNOT BE UPDATED');
	END IF;
END;
/



CREATE OR REPLACE PROCEDURE UPDATE_PUBLISHER(P_ID IN VARCHAR2, P_NAME IN VARCHAR2, P_ADDRESS IN VARCHAR2, P_EMAIL_ID IN VARCHAR2, P_WEB_ADDRESS IN VARCHAR2) IS 
BEGIN 
	IF (IS_VALID_UPDATE_PUBLISHER(P_ID, P_EMAIL_ID, P_NAME)) THEN
		UPDATE PUBLISHER
		SET NAME = P_NAME, ADDRESS = P_ADDRESS, EMAIL_ID = P_EMAIL_ID, WEB_ADDRESS = P_WEB_ADDRESS 
		WHERE PUBLISHER_ID = P_ID;
	ELSE 
		raise_application_error(-20111,'PUBLISHER CANNOT BE UPDATED');
	END IF;
END;
/



CREATE OR REPLACE PROCEDURE UPDATE_GENRE(G_ID IN VARCHAR2, G_NAME IN VARCHAR2) IS
BEGIN
	IF (IS_VALID_UPDATE_GENRE(G_ID, G_NAME)) THEN
		UPDATE GENRE SET GENRE_NAME = G_NAME WHERE GENRE_ID = G_ID;
	ELSE 
		raise_application_error(-20111,'GENRE CANNOT BE UPDATED');
	END IF;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_GENRE(G_ID IN VARCHAR2) IS	
BEGIN
	IF(IS_VALID_DELETE_GENRE(G_ID)) THEN
		DELETE FROM GENRE WHERE GENRE_ID = G_ID;
	ELSE 
		raise_application_error(-20111,'GENRE CANNOT BE DELETED');
	END IF;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_BOOK(B_ISBN IN VARCHAR2, B_TITLE IN VARCHAR2, B_COVER_IMAGE IN VARCHAR2, B_BINDING IN VARCHAR2, B_NUMBER_OF_PAGES IN NUMBER, B_ORIGINAL_PUBLICATION_YEAR IN NUMBER, B_LANGUAGE IN VARCHAR2, B_DESCRIPTION IN VARCHAR2, B_SUMMARY IN VARCHAR2, B_PUBLICATION_DATE IN DATE) IS
BEGIN 
	IF (IS_VALID_ISBN(B_ISBN)) THEN
			raise_application_error(-20111,'DOES NOT EXIST');
	ELSE 
		UPDATE BOOK
		SET TITLE = B_TITLE, BINDING = B_BINDING, NUMBER_OF_PAGES = B_NUMBER_OF_PAGES, ORIGINAL_PUBLICATION_YEAR = B_ORIGINAL_PUBLICATION_YEAR, LANGUAGE = B_LANGUAGE, DESCRIPTION = B_DESCRIPTION, SUMMARY = B_SUMMARY, PUBLICATION_DATE = B_PUBLICATION_DATE
		WHERE ISBN = B_ISBN;
	END IF;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_BOOK(B_ISBN IN VARCHAR2) IS 
	P NUMBER;
BEGIN
	SELECT COUNT(*) INTO P FROM BOOK WHERE ISBN = B_ISBN;
	IF P=0 THEN
				raise_application_error(-20111,'No Data Found');
	ELSE
			SELECT ISBN INTO P FROM BOOK WHERE ISBN = B_ISBN;
			DELETE FROM BOOK_AWARD WHERE ISBN = B_ISBN;
			DELETE FROM REVIEW WHERE ISBN = B_ISBN;
			DELETE FROM BOOKSHELF_CONTENT WHERE ISBN = B_ISBN;
			DELETE FROM RATING WHERE ISBN = B_ISBN;
			DELETE FROM WRITTEN_BY WHERE ISBN = B_ISBN;
			DELETE FROM BOOK_GENRE WHERE ISBN = B_ISBN;
			DELETE FROM BOOK WHERE ISBN = B_ISBN;
	END IF;
END;
/


