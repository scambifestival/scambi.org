import github
import requests
import json

import yaml
from github import Github, Repository, Branch
from dataclasses import dataclass
from termcolor import colored, cprint
from time import sleep


@dataclass
class Git:
    g: Github
    repo: Repository
    branch: Branch


# noinspection SpellCheckingInspection
def main():
    print("----------------------------------------------------------------------------\n")
    print("Hi! This is a small tool to update JSON files in the scambi.org/data repository!")

    tables_infos = get_tables_infos()
    if type(tables_infos) is not dict:
        return
    # Following infos should be hidden
    git = github_log(user=<USERNAME>, psw=<ACCESS TOKEN>)
    menu_prompter(git, tables_infos)

    print("\nProcess done. Bye!")


def menu_prompter(git: Git, tables_infos: dict):
    info_text = colored("referenceTableName#1:fileNameToUpdate#1", "light_yellow")
    info_text1 = colored("referenceTableTame#2:fileTameToUpdate#2", "light_blue")
    print("\nPress ENTER to get 'toUpdate.ylm' file from the repo."
          "\nAlternatively, you can:")
    print("\t- Type a comma separated list like\n\t\t" + info_text + "," + info_text1 + ",...")
    print("\t- Send 'list' to get a JSON/CSV files list in the 'scambifestival/scambi.org/data/' directory.")
    print("\t- Send 'tables' to see all the tables I can work with.\n")
    print("\t- Send 'quit' to exit.")
    print("\n----------------------------------------------------------------------------\n")
    uinput = input()

    while uinput.lower() != "quit":
        if uinput == "help":
            print("----------------------------------------------------------------------------\n")
            sleep(1)
            print("Press ENTER to get 'toUpdate.ylm' file from the repo."
                  "\nAlternatively, you can:")
            print("\t- Type a comma separated list like\n\t\t" + info_text + "," + info_text1 + ",...")
            print("\t- Send 'list' to get a JSON/CSV files list in the 'scambifestival/scambi.org/data/' directory.")
            print("\t- Send 'tables' to see all the tables I can work with.\n")
            print("\t- Send 'quit' to exit.")
            print("\n----------------------------------------------------------------------------")
            uinput = input()
        if not uinput:
            source = requests.get(
                "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
            )
            if source.ok:
                yalm_file = yaml.load(source.text, Loader=yaml.Loader)
                print("OK! Those files will be processed:\n")
                count = 1
                to_update = {}
                for item in yalm_file['tables']:
                    key, value = list(item.keys())[0], list(item.values())[0]
                    to_update[key] = value
                    if value == "" or value == " ":
                        print(str(count) + ". '" + key + ".json' (should be created using table w/ reference name '"
                              + key + "')")
                    else:
                        print(str(count) + ". '" + value + "' (should be updated using table w/ reference name '"
                              + key + "')")
                    count += 1
                print("\n(Y) Proceed with updating these tables.")
                print("(N) Go back to the menu.\n")
                uinput = input()
                while uinput.lower() != "y" and uinput.lower() != "n":
                    print("Didn't understand the answer...\n")
                    print("(Y) Proceed with processing these files.")
                    print("(N) Go back to the main menu.\n")
                    uinput = input()
                if uinput.lower() == "y":
                    print()
                    dispatcher(tables_infos, to_update, git)
                    uinput = "quit"
                elif uinput.lower() == "n":
                    uinput = "help"
            else:
                cprint("\nERROR while getting 'toUpdate.yml' content.\nAuto update cannot be executed.\n", "red")
                uinput = "help"

        elif uinput == "list":
            files = repo_file_getter(git)
            if files is not None:
                print("\nNow you can type a list of space separated numbers to tell which files you want to be updated."
                      "\nAlternatively, you can press ENTER to go back to the main menu.\n")
                uinput = input()
                if uinput == "":
                    uinput = "help"
                else:
                    numbers = uinput.split(" ")
                    numbers = ['{}'.format(number) for number in numbers if number != ""]
                    not_duplicates = []
                    for number in numbers:
                        if uinput != "help":
                            if number not in not_duplicates:
                                while number != "" and not number.isnumeric():
                                    sleep(0.5)
                                    cprint("\nGiven number '" + number + "' has something wrong.\n", "yellow")
                                    sleep(0.8)
                                    print("Please digit it again without any other char.\n"
                                          "Send '0' to ignore this number.\n\n"
                                          "Press ENTER to go back to the main manu.\n")
                                    number = input()
                                if number == "":
                                    uinput = "help"
                                    break
                                elif number == "0":
                                    continue
                                elif number not in not_duplicates:
                                    not_duplicates.append(number)
                                else:
                                    cprint("\n! '" + number + "' will be ignored (it's duplicated).", "yellow")
                                    sleep(0.8)
                            else:
                                cprint("\n! '" + number + "' will be ignored (it's duplicated).", "yellow")
                                sleep(0.8)
                        else:
                            break
                    if uinput != "help":
                        count = 0
                        print("\nOk! so those are the selected files:\n")
                        sleep(0.8)
                        for number in not_duplicates:
                            if number in files:
                                print("\t" + number + ". " + files[number])
                                not_duplicates[count] = files[number]
                                count += 1
                            else:
                                cprint("\t! '" + number + "' ignored (was not in the list)", "yellow")
                            sleep(0.2)
                        not_duplicates = ['{}'.format(el) for el in not_duplicates if not el.isnumeric()]
                        print("\nCan I start processing those files?\n(Y) Proceed.\n(N) Go back to the main menu.\n")
                        uinput = input()
                        while uinput.lower() != "y" and uinput.lower() != "n":
                            print("Sorry, didn't understand the answer. "
                                  "Can I proceed with processing those files?\n(Y) Proceed"
                                  "\n(N) Go back to the main menu")
                            uinput = input()
                        if uinput.lower() == "n":
                            uinput = "help"
                        else:
                            outcome = manual_update(tables_infos, git, not_duplicates)
                            if outcome.lower() != "menu":
                                uinput = "quit"
                            else:
                                uinput = "help"

        elif uinput == "tables":
            print("\nHere's a list of the tables I can work with:\n")
            sleep(0.5)
            for el in tables_infos:
                print("\t- " + el)
                sleep(0.2)
            sleep(0.6)
            print("\nNow you can:\n\t- Send 'list' to get a JSON/CSV file "
                  "list from the 'data/' folder in the repo.\n\t- Send a comma separated list like:\n\t\t"
                  + info_text + "," + info_text1 + ",...\n\t- Press ENTER to get 'toUpdate.yml' from the repo."
                                                   "\n\n\t- Send 'quit' to exit.\n")
            uinput = input()

        elif ":" in uinput:
            sleep(0.5)
            names = uinput.split(",")
            count = 0
            for name in names:
                if uinput == "help":
                    break
                uinput = "None"
                formatted = colored("nomeTabellaDiRiferimento:nomeFileDaAggiornare", "green")
                elems = name.split(":")
                while (len(elems) != 2 or elems[0] == "" or elems[1] == "") and uinput != "help" \
                        and uinput.lower() != "skip":
                    sleep(0.5)
                    cprint("\nYou gave '" + name + "' wrong formatted.", "yellow")
                    sleep(1)
                    print("\nPlease write it again using this format:\n\n\t" + formatted +
                          "\n\nReference tables names can be found in the main menu or in the 'tablesInfos.yml' file.\n"
                          "\n\t- Send 'skip' to skip this file.\n"
                          "\t- Press ENTER to go back to the main menu.\n")
                    name = input()
                    if name == "":
                        uinput = "help"
                    elif name.lower() == "skip":
                        sleep(0.5)
                        print("\nFile skipped.")
                        break
                    else:
                        elems = name.split(":")

                if name.lower() == "skip":
                    names[count] = ""
                    count += 1
                    continue

                sleep(0.3)
                if uinput != "help":
                    # noinspection PyUnboundLocalVariable
                    elems = ['{0}'.format(elem.removesuffix(" ")) for elem in elems]
                    elems = ['{0}'.format(elem.removeprefix(" ")) for elem in elems]
                    while elems[0] not in tables_infos and uinput.lower() != "skip":
                        sleep(0.5)
                        cprint("\nReference table name '" + elems[0] + "' is not in the 'tablesInfos.yml' file.\n",
                               "yellow")
                        sleep(1)
                        print("Those are the reference names I got:\n")
                        sleep(0.5)
                        for el in tables_infos:
                            print("\t- " + el + "\t (" + tables_infos[el]["name"] + ")")
                            sleep(0.2)
                        sleep(0.8)
                        print("\nPlease write the reference table name for '" + elems[1] + "' again OR:\n"
                              "\t- Press ENTER to go back to the main menu.\n"
                              "\t- Send 'skip' to skip this file.\n")
                        uinput = input()
                        if uinput.lower() == "skip":
                            print("\nFile skipped.")
                            break
                        elif uinput != "":
                            elems[0] = uinput
                        else:
                            uinput = "help"
                            break

                    if uinput.lower() == "skip":
                        names[count] = ""
                        count += 1
                        continue

                    # noinspection PyUnboundLocalVariable
                    while not elems[1].endswith(".csv") and not elems[1].endswith(".json") and uinput != "help"\
                            and uinput.lower() != "skip":
                        cprint("\nYou missed a file extension (file: '" + elems[1] + "').", "yellow")
                        sleep(1)
                        print("\nPlease write this filename with its extension ('.json'/'.csv') OR:\n"
                              "\t- Send 'skip' to skip this file.\n"
                              "\t- Press ENTER to go back to the main menu.\n")
                        uinput = input()
                        if uinput.lower() == "skip":
                            print("\nFile skipped.")
                            break
                        if uinput != "":
                            elems[1] = uinput
                            name = elems[0] + ":" + elems[1]
                        else:
                            uinput = "help"

                if uinput.lower() != "skip":
                    names[count] = name
                    count += 1
                else:
                    names[count] = ""
                    count += 1

            if uinput != "help":
                names = ["{}".format(el) for el in names if el != ""]
                if len(names) != 0:
                    names = sorted(names, key=str.lower)
                    set_ = set(names)
                    if list(set_) != names:
                        sleep(0.5)
                        print("\nIgnoring duplicates...")
                        sleep(0.5)
                    names = list(set_)
                    count = 1
                    print("\nOk! Those are the files:\n")
                    sleep(1)
                    for name in names:
                        print("\t" + str(count) + ". " + name.split(":")[1])
                        count += 1
                    sleep(1)
                    print("\nCan I proceed with the upload?\n")
                    print("(Y) Proceed with processing those files.")
                    print("(N) Go back to the main menu.\n")
                    uinput = input()
                    while uinput.lower() != "y" and uinput.lower() != "n":
                        print("\nSorry, didn't understand the answer. Can I proceed with updating those files?")
                        print("(Y) Proceed with processing those files.")
                        print("(N) Go back to the main menu.\n")
                        uinput = input()
                    if uinput.lower() == "n":
                        uinput = "help"
                    else:
                        manual_update(tables_infos, git, names)
                        uinput = "quit"
                else:
                    print("\nNo file to upload. Back to the main menu.\n")
                    uinput = "help"

        elif uinput == "quit":
            continue

        else:
            print("\nSorry, didn't understand your input.\n")
            uinput = "help"

    if uinput.lower() == "quit":
        return


def github_log(user: str, psw: str):
    g = Github(user, psw)
    repo = g.get_repo("scambifestival/scambi.org")
    git = Git(
        g=g,
        repo=repo,
        branch=repo.get_branch("scripts")
    )
    return git


def manual_update(tables_infos: dict, git: Git, file_names: list):
    flag = True
    json_contents = {}
    file_dict = {}
    uinput = None
    for name in file_names:
        flag1 = False
        if ":" in name:
            coord = name.split(":")
            try:
                git.repo.get_contents("data/{}".format(coord[1]), ref="scripts")
            except github.GithubException as e:
                if e.status == 404:
                    cprint("\nERROR while searching for '" + coord[1] + "' in the repository."
                           "\nThis file seems to not be in the 'data/' folder, so I can't upload it.\n", "red")
                else:
                    cprint("ERROR while trying to get '" + coord[1] + "' in the repository (error code: " +
                           str(e.status) + "). I can't upload it.\n", "red")
                print("Jumping to the next one...\n")
                continue
            print("\n➔ Getting '" + coord[1] + "' new content...")
            sleep(1)
            json_contents[coord[1]] = {}
            json_contents[coord[1]]["content"] = json.dumps(relations(
                tables_infos[coord[0]],
                coord[1], coord[1], git, False),
                indent=4, ensure_ascii=False)
            json_contents[coord[1]]["key"] = coord[0]

        else:
            print("\n➔ Getting '" + name + "' new content...")
            sleep(1)
            json_contents[name] = {}
            for i in tables_infos:
                if i in name:
                    cprint("\nI'll use table with reference name '" + i + "' to update '" + name + "' file.\n", "green")
                    sleep(1)
                    print("Choose an option:\n"
                          "\t- Press ENTER to confirm.\n"
                          "\t- Send 'list' to get the reference tables names list.\n"
                          "\t- Send 'skip' to skip this file.\n"
                          "\t- Send 'menu' to go back to the menu.\n")
                    uinput = input()
                    while uinput not in tables_infos and uinput != "" and uinput.lower() != "skip" \
                            and uinput.lower() != "menu":
                        if uinput.lower() != "list":
                            print("\nSorry, didn't understand your input.")
                            if flag1 is False:
                                print("\t- Press ENTER to confirm.")
                            else:
                                print("\t- Name a table from the list above.")
                            print("\t- Send 'list' to get the reference tables names list.\n"
                                  "\t- Send 'skip' to skip this file.\n"
                                  "\t- Send 'menu' to go back to the menu.\n")
                            uinput = input()
                        else:
                            flag = True
                            print("\nHere's a list of the tables I can work with:\n")
                            sleep(0.5)
                            for el in tables_infos:
                                print("\t- " + el + "\t(" + tables_infos[el]["name"] + ")")
                                sleep(0.2)
                            sleep(0.6)
                            print("\nChoose an option:\n"
                                  "\t- Name a table from the list above.\n"
                                  "\t- Send 'skip' to skip this file.\n"
                                  "\t- Send 'menu' to go back to the menu.\n")
                            uinput = input()

                    if uinput == "":
                        json_contents[name]["content"] = json.dumps(relations(tables_infos[i], name, name, git, False),
                                                                    indent=4, ensure_ascii=False)
                        json_contents[name]["key"] = i
                        break

                    elif uinput in tables_infos:
                        json_contents[name]["content"] = json.dumps(relations(
                            tables_infos[uinput],
                            name, name, git, False),
                            indent=4, ensure_ascii=False)
                        json_contents[name]["key"] = uinput
                        break
                    elif uinput.lower() == "skip":
                        del json_contents[name]
                        sleep(0.5)
                        print("\nFile skipped.")
                        sleep(1)
                        break

                    else:
                        return uinput

            if name in json_contents:
                if "content" not in json_contents[name]:
                    print("\nWhat is the reference name of the table I should use to update '" + name + "'?")
                    print("Alternatively:\n\t- Send 'list' to get a list tables reference names.\n"
                          "\t- Send 'skip' to skip this file.\n"
                          "\t- Send 'menu' to go back to the main menu.\n")
                    uinput = input()
                    while uinput not in tables_infos and uinput.lower() != "menu" and uinput.lower() != "skip":
                        if uinput.lower() != "list":
                            print("\nSorry, didn't understand your input.")
                            print("\t- Send 'list' to get the reference tables names list.\n"
                                  "\t- Send 'skip' to skip this file.\n"
                                  "\t- Send 'menu' to go back to the menu.\n")
                            uinput = input()
                        else:
                            print("\nHere's a list of the tables I can work with:\n")
                            sleep(0.5)
                            for el in tables_infos:
                                print("\t- " + el + " (" + tables_infos[el]["name"] + ")")
                                sleep(0.2)
                            sleep(0.6)
                            print("\nChoose an option:\n"
                                  "\t- Name a table from the list above.\n"
                                  "\t- Send 'skip' to skip this file.\n"
                                  "\t- Send 'menu' to go back to the menu.\n")
                            uinput = input()

                    if uinput.lower() == "menu":
                        return uinput

                    elif uinput.lower() != "skip":
                        json_contents[name]["contents"] = json.dumps(
                            relations(tables_infos[uinput], name, name, git, False),
                            indent=4, ensure_ascii=False)
                        json_contents[name]["key"] = uinput
                        break
                    else:
                        del json_contents[name]
                        print("\nFile skipped.")
                        break

    sleep(1)
    print("\n➔ Starting process...")
    sleep(0.5)
    for el in json_contents:
        if el.endswith(".csv"):
            file_dict[json_contents[el]["key"]] = update_file_to_github(git, el, el.removesuffix("csv") + "json",
                                                                        json_contents[el]["key"],
                                                                        json_contents[el]["content"])
        else:
            file_dict[json_contents[el]["key"]] = update_file_to_github(git, el, el, json_contents[el]["key"],
                                                                        json_contents[el]["content"])

    print("\n➔ All files processed")
    sleep(0.5)
    print("\n➔ Checking the configuration file 'toUpdate.yml'...\n")
    sleep(0.3)
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
    )
    if source.ok:
        yalm_file = yaml.load(source.text, Loader=yaml.Loader)
        to_update = {}
        for item in yalm_file['tables']:
            key, value = list(item.keys())[0], list(item.values())[0]
            to_update[key] = value

        for el in to_update:
            if el not in file_dict:
                file_dict[el] = ""

        for el in file_dict:
            if file_dict[el] is None:
                file_dict[el] = to_update[el]

        for el in file_dict:
            if flag is False:
                break
            if file_dict[el] == "":
                continue
            for el1 in to_update:
                if el == el1:
                    if file_dict[el] == to_update[el1]:
                        break
                    else:
                        toUpdate_updater(file_dict, git)
                        flag = False
                        pass

        if flag is True:
            print("➔ Update to 'toUpdate.yml' not needed (file names didn't changed!)")

    else:
        cprint("ERROR while getting 'toUpdate.yml' content for updating the configuration file. Cannot upload it.\n"
               "Code: " + str(source.status_code), "red")
    return uinput


def dispatcher(tables_infos: dict, to_update: dict, git: Git):
    new_files = {}
    new_file = None
    for key in to_update:
        if new_file is not None:
            print("Jumping to the next one...\n")
            sleep(1)
            new_file = None
        print("➔ Updating '" + key + "' file using its table...")
        if key not in tables_infos:
            errors_handler(key)

        elif "id" not in tables_infos[key]:
            errors_handler("id")

        elif "view_id" not in tables_infos[key]:
            errors_handler("view_id")

        elif "included" not in tables_infos[key]:
            errors_handler("included")

        elif "filters" not in tables_infos[key]:
            errors_handler("filters")

        else:
            new_file = relations(tables_infos[key], to_update[key], key + ".json", git, True)

        if new_file is not None:
            new_files[key] = new_file
        else:
            new_files[key] = to_update[key]
    print("➔ All files processed")
    sleep(0.5)
    print("\n➔ Checking 'toUpdate.yml' configuration file...")
    if new_files != to_update:
        toUpdate_updater(new_files, git)
    else:
        sleep(0.5)
        print("\n➔ Updating 'toUpdate.yml' not needed (file names didn't change!)")


def relations(tables_infos: dict, file_to_update: str, new_file_name: str, git: Git, commit: bool):
    url = "https://pino.scambi.org/api/database/rows/table/{}/?user_field_names=true".format(tables_infos["id"])
    params = {"include": tables_infos["included"]}
    key_ = new_file_name[:len(new_file_name) - 5]

    if tables_infos["filters"] != "":
        for filter_ in tables_infos["filters"].split(","):
            filter_value = filter_.split("=")
            if filter_value[1].isnumeric():
                params[filter_value[0]] = int(filter_value[1])
            else:
                params[filter_value[0]] = filter_value[1]

    if tables_infos["view_id"] != 0:
        params["view_id"] = int(tables_infos["view_id"])

    req = requests.get(
        url=url,
        headers={"Authorization": "Token TOKEN"},
        params=params
    )

    if req.status_code != 200:
        cprint("\tERROR while gathering '" + tables_infos["name"] + "' table from Pino. The associated file will not "
                                                                    "be updated.\n\t" + str(req.headers), "red")
        return None

    dict_ = req.json()["results"]

    for sub_dict in dict_:
        if "id" in sub_dict:
            del sub_dict['id']
        if "order" in sub_dict:
            del sub_dict['order']
        for key in sub_dict:
            if type(sub_dict[key]) is list:
                if len(sub_dict[key]) != 0:
                    if "value" in sub_dict[key][0]:
                        sub_dict[key] = sub_dict[key][0]['value']
                else:
                    sub_dict[key] = ""
            elif type(sub_dict[key]) is dict:
                if len(sub_dict[key]) != 0:
                    if "value" in sub_dict[key]:
                        sub_dict[key] = sub_dict[key]["value"]
                    else:
                        sub_dict[key] = ""

    for sub_dict in dict_:
        for key in sub_dict:
            if type(sub_dict[key]) is str:
                if "\n" in sub_dict[key]:
                    sub_dict[key] = text_fixer(sub_dict[key])

    dict_ = sorted(dict_, key=sorting_key)

    if commit:
        return update_file_to_github(git, file_to_update, new_file_name, key_, json.dumps(dict_, indent=4,
                                                                                          ensure_ascii=False))
    else:
        return dict_


def text_fixer(content: str):
    words = content.split(sep=" ")
    content = ""
    for word in words:
        if "\n" in word:
            word = word.replace("\n", " ")
            word = word.replace("  ", " ")
        if content == "":
            content += word
        else:
            content += " " + word
    return content


def get_tables_infos():
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/tablesInfos.yml"
    )
    if source.ok:
        yaml_file = yaml.load(source.text, Loader=yaml.Loader)
        return yaml_file['tables']
    else:
        cprint("CRITICAL ERROR while parsing 'tablesInfos.yml' file. Please contact @AleLntr on Telegram.", "red")
        return source


def repo_file_getter(git: Git):
    try:
        contents = git.repo.get_contents("/data", ref="scripts")
    except github.GithubException as e:
        cprint("ERROR while trying to get the repository files.\n\t" + str(e.headers), "red")
    else:
        sleep(0.8)
        print("\nHere's a list of the JSON/CSV files (not every file is updatable!):\n")
        count = 1
        files = {}
        for li in contents:
            if li.name.endswith(".csv") or li.name.endswith(".json"):
                sleep(0.2)
                print("\t" + str(count) + ". " + li.name)
                files[str(count)] = li.name
                count += 1
        sleep(0.8)
        return files
    return None


# noinspection PyUnusedLocal,DuplicatedCode
def update_file_to_github(git: Git, old_file_name: str, new_file_name: str, key: str, file_content: str):
    was_csv = False
    update = False
    script_message = "(SCRIPT MESSAGE) File format not correct: this file needs to be replaced."
    name_to_detect = ""

    sleep(1)
    print("\n➔ Processing '" + new_file_name + "' file...")
    sleep(1)

    if old_file_name != "":
        print("➔ Getting old file content...")
        sleep(1)
        try:
            contents = git.repo.get_contents("data/{}".format(old_file_name), ref="scripts")
        except github.UnknownObjectException as e:
            if e.status == 404:
                cprint("\n\tERROR while trying to get old '" + old_file_name + "'", "yellow")
                cprint("\tGiven file '" + old_file_name + "' was not found in the repository.", "yellow")
                print("\tJumping to the next step...")
                name_to_detect = old_file_name.split(".")[0]
                old_file_name = ""

        except github.GithubException as e:
            cprint("\n\tERROR while trying to get the old '" + old_file_name + "' file content to update.", "red")
            cprint("\tStatus: " + str(e.status) + "\nData: " + str(e.data) + "\nHeaders: " + str(e.headers), "red")
            cprint("\tThis file will not be updated.", "red")

            print("➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.")
            return None
        sleep(1)
    else:
        name_to_detect = new_file_name.split(".")[0] + ".csv"

    if old_file_name.endswith('.csv'):
        was_csv = True
        print("➔ Old file has wrong format (.csv). Deleting it...")
        sleep(1)
        try:
            # noinspection PyUnboundLocalVariable
            deleting_commit = git.repo.delete_file(contents.path, script_message, contents.sha, branch="scripts")
        except github.GithubException as e:
            cprint("\tERROR while trying to delete wrong format '" + old_file_name + "' file.", "yellow")
            cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers),
                   "yellow")
            sleep(0.5)
            cprint("\n\tUpdating the new file will still be attempted.\n", "green")
            print("\tJumping to the next step...")

        name_to_detect = old_file_name[:len(old_file_name) - 3]
        # Se creassi un nuovo file JSON con il nome del vecchio file indicato, in caso di un successivo aggiornamento
        # manuale, l'utente dovrebbe indicare una tabella di riferimento; invece, creando un file col nome di
        # riferimento tabella, lo script sceglierebbe da sé la tabella di riferimento.
        # new_file_name = name_to_detect + "json"
        old_file_name = ""
        sleep(1)

    if not old_file_name.endswith('.csv'):
        if old_file_name != "":
            name_to_detect = old_file_name.split(".")[0] + ".csv"
        elif was_csv is True:
            name_to_detect = name_to_detect + "csv"
        else:
            name_to_detect = new_file_name.split(":")[0] + ".csv"

        try:
            get_csv = git.repo.get_contents("data/{}".format(name_to_detect), ref="scripts")
        except github.GithubException as e:
            if e.status != 404:
                print("\tIn the meantime, I was searching for a CSV file with the same name to ask you to remove it.\n"
                      "\tBy the way an error occurred so I'll ignore this step...")

        else:
            print("➔ CSV file '" + name_to_detect + "' was found in the repository.")
            cprint("\n\tDo you want me to delete it? (Y/N)\n", "yellow")
            uinput = input()
            while uinput.lower() != "y" and uinput.lower() != "n":
                print("\tSorry, didn't understand the answer.\n\tDo want me to delete the detected CSV file? (Y/N)")
                uinput = input()
            if uinput.lower() == "y":
                sleep(0.5)
                print("\n➔ Deleting detected CSV file '" + name_to_detect + "' from the repo...")
                sleep(1)
                try:
                    # noinspection PyUnboundLocalVariable
                    deleting_commit = git.repo.delete_file(get_csv.path, script_message, get_csv.sha, branch="scripts")
                except github.GithubException as e:
                    print("\n\tERROR while trying to delete '" + name_to_detect + "' detected file.", "yellow")
                else:
                    print("\n➔ '" + name_to_detect + "' correctly deleted from the repo!")
            print("\n\tJumping to the next step...\n")
            sleep(1)

    if old_file_name == "":
        print("➔ Creating new '" + new_file_name + "' file in the repository...")
        old_file_name = new_file_name
        sleep(1)
        try:
            new_file_commit = git.repo.create_file("data/{}".format(new_file_name),
                                                   "new file (script)",
                                                   file_content,
                                                   branch="scripts")
        except github.GithubException as e:
            if e.status == 422:
                cprint("\n\tERROR while trying to create new '" + new_file_name + "' file. "
                                                                                  "There was one already!", "yellow")
                sleep(0.5)
                cprint("\tNo problem, I'm jumping to the next step...", "yellow")
                update = True

            else:
                cprint("\n\tERROR while trying to create '" + new_file_name + "' file.", "red")
                cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers),
                       "red")
                cprint("\tThis file will not be updated.", "red")
                sleep(0.5)
                cprint("\n➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.", "red")
                return None
        else:
            return new_file_name

    if old_file_name != "" or update is True:
        contents = git.repo.get_contents("data/{}".format(old_file_name), ref="scripts")
        print("➔ Updating '" + old_file_name + "' content...")
        sleep(1)
        try:
            updating_commit = git.repo.update_file(contents.path,
                                                   "updating " + old_file_name,
                                                   file_content,
                                                   contents.sha,
                                                   branch="scripts")
        except github.GithubException as e:
            cprint("\n\tERROR while trying to update '" + old_file_name + "' file.", "red")
            cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers), "red")
            cprint("\tThis file will not be updated.", "red")
            sleep(0.5)
            print("\n➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.")
            return None

    print("➔ " + old_file_name + " correctly updated!\n")
    sleep(1)
    return old_file_name


def sorting_key(elem):
    return elem[list(elem.keys())[0]]


def toUpdate_updater(new_updated_files: dict, git: Git):
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
    )

    if source.ok:
        yaml_file = yaml.load(source.text, Loader=yaml.Loader)
        for el in yaml_file["tables"]:
            key = list(el.keys())[0]
            if new_updated_files[key] != "":
                for el1 in yaml_file["tables"]:
                    if list(el1.keys())[0] == key:
                        el1[list(el1.keys())[0]] = new_updated_files[key]

        yaml_file = yaml.dump(yaml_file)
        tmp_list = yaml_file.split("\n")
        tmp_list = ['{}'.format(el) for el in tmp_list if el != '']
        # tmp_list.pop(len(tmp_list)-1)
        yaml_file = ""
        for word in tmp_list:
            if "tables" not in word:
                sub_list = word.split(": ")
                if "''" not in sub_list[1]:
                    sub_list[1] = "\"" + sub_list[1] + "\""
                else:
                    sub_list[1] = "\"\""
                word = sub_list[0] + ": " + sub_list[1]
            word += "\n"
            if "tables" not in word:
                word = "  " + word
            yaml_file += word
        try:
            contents = git.repo.get_contents("scripts/updatingdata/toUpdate.yml", ref="scripts")
            # noinspection PyUnusedLocal
            update_commit = git.repo.update_file(contents.path, "updating 'toUpdate.yml' configuration file.",
                                                 yaml_file, contents.sha, branch="scripts")
        except github.GithubException as e:
            cprint("\tERROR while updating the 'toUpdate.yml' configuration file.\n"
                   "\tError status:" + str(e.status) + "\tYou'll need to update it by yourself", "red")
        else:
            print("➔ Configuration file updated successfully!")

    else:
        cprint("\n\tERROR while gathering 'toUpdate.yml' to update its content."
               "\n\tConfiguration file cannot be updated.", "red")


def errors_handler(value: str):
    sleep(1.2)
    if value != "name" and value != "id" and value != "view_id" and value != "included" and value != "filters":
        cprint("\n\tERROR while getting '" + value + "' table infos."
               "\n\tPlease make sure to use the same word both in 'toUpdate.yml' and in 'tablesInfos.yml'.", "yellow")
        sleep(0.4)
        print("\nJumping to the next table...\n")
    else:
        cprint("\n\tERROR while getting the '" + value + "' info from table infos."
               "\n\tPlease make sure to add all the infos I need in the 'tablesInfos.yml' file.", "yellow")
        sleep(0.4)
        print("\nJumping to the next table...\n")
    sleep(1)


if __name__ == "__main__":
    main()
